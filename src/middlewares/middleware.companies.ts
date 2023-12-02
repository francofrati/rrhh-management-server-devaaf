import { NextFunction, Request, Response } from "express";
import { Company } from "../types/companies";

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
