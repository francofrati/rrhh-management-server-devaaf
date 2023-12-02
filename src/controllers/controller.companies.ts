import { Request, Response } from "express";
import { Company } from "../types/companies";
import { uploadCompanyToDb } from "../services/services.companies";
import { DBInstances } from "../database/config";

export const createCompanieController = async (
  req: Request<any, any, Company>,
  res: Response
) => {
  try {
    const { name, brand_img } = req.body;

    const newCompany: Company = {
      name,
      brand_img,
    };

    await uploadCompanyToDb(newCompany, DBInstances.supabase_postgres);

    return res.status(200).send({
      message: "New company added!",
      company: newCompany,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error,
      message: error.message,
    });
  }
};
