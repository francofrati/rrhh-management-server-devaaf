import { Request, Response } from "express";
import { Employee } from "../types/employees";
import { insertInto } from "../database/utils.database";
import { DBInstances } from "../database/config";
import { getCompanyEmployees } from "../services/services.companies";

export const addNewEmployeeController = async (
  req: Request<{ companyId: string }, any, Employee & { id: number | string }>,
  res: Response
) => {
  try {
    const { address, dni, first_name, last_name, phone_number, email, id } =
      req.body;
    const { companyId } = req.params;

    const values = [
      address,
      dni,
      first_name,
      last_name,
      phone_number,
      email,
      +id,
      +companyId,
    ];

    await DBInstances.supabase_postgres.query(
      `INSERT INTO employees(address, dni, first_name, last_name, phone_number, email, user_id, company_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      values
    );

    return res.send({
      message: "Employee added succesfully",
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const getEmployeesByCompanyController = async (
  req: Request<{ companyId: string }, any, { id: string | number }>,
  res: Response
) => {
  try {
    const { companyId } = req.params;
    const employees = await getCompanyEmployees(
      companyId,
      DBInstances.supabase_postgres
    );

    return res.send(employees);
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
