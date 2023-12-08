import { Company } from "../types/companies";

export const uploadCompanyToDb = async (company: Company, DBInstance: any) => {
  DBInstance.query(
    `INSERT INTO companies (name, brand_img) VALUES('${company.name}', '${company.brand_img}')`
  );
};

export const getCompanyEmployees = async (
  companyId: string | number,
  DBInstance: any
) => {
  const { rows: employees } = await DBInstance.query(
    `SELECT first_name, last_name, address, profile_img, phone_number, id, email, dni FROM employees WHERE company_id=${companyId}`
  );

  return employees;
};
