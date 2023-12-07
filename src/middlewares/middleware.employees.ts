import { NextFunction, Request, Response } from "express";
import { Employee } from "../types/employees";
import {
  invalidParametersError,
  missingParametersError,
} from "../lib/errors/errors.validations";

export const validateNewEmployeeData = async (
  req: Request<{ companyId: string }, any, Employee & { id: string | number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address, dni, first_name, last_name, phone_number, email } =
      req.body;

    if (
      !address ||
      !dni ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !email
    )
      missingParametersError();

    if (
      typeof address !== "string" ||
      typeof dni !== "string" ||
      typeof first_name !== "string" ||
      typeof last_name !== "string" ||
      typeof phone_number !== "string" ||
      typeof email !== "string"
    )
      invalidParametersError();

    next();
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};
