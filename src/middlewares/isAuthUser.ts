import { NextFunction, Request, Response } from "express";
import {
  invalidParametersError,
  missingParametersError,
} from "../lib/errors/errors.validations";
import { DBInstances } from "../database/config";

export const isAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.body;

    if (!uid) missingParametersError();
    if (typeof uid !== "string") invalidParametersError();

    const userQuery = await DBInstances.supabase_postgres.query(
      `SELECT * FROM users WHERE firebase_uid='${uid}' LIMIT 1`
    );

    if (userQuery.rows.length) {
      req.body.id = userQuery.rows[0].id;
      next();
      return;
    }

    throw Error("Unauthorized!");
  } catch (error: any) {
    return res.status(401).send({
      message: error.message,
    });
  }
};
