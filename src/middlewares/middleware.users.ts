import { NextFunction, Request, Response } from "express";
import { User } from "../types/users.d";
import {
  invalidParametersError,
  missingParametersError,
} from "../lib/errors/errors.validations";

export const validateNewUserData = async (
  req: Request<any, any, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (!body) missingParametersError();

    const {
      company_id,
      email,
      first_name,
      last_name,
      national_id,
      nationality,
      phone_number,
      password,
    } = body;

    if (
      !company_id ||
      !email ||
      !first_name ||
      !last_name ||
      !national_id ||
      !nationality ||
      !phone_number ||
      !password
    )
      missingParametersError();

    for (const key in body) {
      if (
        key !== "company_id" &&
        key !== "email" &&
        key !== "first_name" &&
        key !== "last_name" &&
        key !== "national_id" &&
        key !== "nationality" &&
        key !== "phone_number" &&
        key !== "profile_img" &&
        key !== "password"
      )
        invalidParametersError();

      if (key === "company_id" && typeof body[key] !== "number")
        invalidParametersError();
      //@ts-ignore
      if (key !== "company_id" && typeof body[key] !== "string")
        invalidParametersError();
    }

    next();
  } catch (error: any) {
    return res.status(422).send({
      message: error.message,
    });
  }
};
