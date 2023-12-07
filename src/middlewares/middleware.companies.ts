import { NextFunction, Request, Response } from "express";

import { DBInstances } from "../database/config";

import { Company } from "../types/companies";
import { Employee } from "../types/employees";

import { missingParametersError } from "../lib/errors/errors.validations";
import { unauthorizedUserError } from "../lib/errors/errors.users";

export const validateNewCompanyData = async (
  req: Request<any, any, Company>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (!body) throw Error("Missing parameters");
    if (!body.brand_img || !body.name) throw Error("Missing parameters");

    const { brand_img, name } = body;

    if (typeof brand_img !== "string" || typeof name !== "string")
      throw Error("Invalid parameter");

    next();
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const userBelongsToCompany = async (
  req: Request<{ companyId: string }, any, Employee & { id: string | number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (!body) missingParametersError();

    if (!body.id) missingParametersError();

    const userId = +body.id;
    const { companyId } = req.params;

    const { rows } = await DBInstances.supabase_postgres.query(
      `SELECT * FROM users WHERE id=${userId} AND company_id=${+companyId} LIMIT 1`
    );

    if (rows.length) return next();
    else unauthorizedUserError();
  } catch (error: any) {
    if (error.message.includes("parameter"))
      return res.status(500).send({ message: error.message });

    return res.status(401).send({ message: error.message });
  }
};
