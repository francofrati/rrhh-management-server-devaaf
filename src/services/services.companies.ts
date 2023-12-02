import { Company } from "../types/companies";

export const uploadCompanyToDb = async (company: Company, DBInstance: any) => {
  DBInstance.query(
    `INSERT INTO companies (name, brand_img) VALUES('${company.name}', '${company.brand_img}')`
  );
};
