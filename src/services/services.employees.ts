import { Employee } from "../types/employees";

export const getEmployeeById = async (
  employeeId: string | number,
  DBInstance: any
) => {
  const { rows } = await DBInstance.query(
    `SELECT * FROM employees WHERE id = ${+employeeId} LIMIT 1`
  );

  const employee: Employee = rows[0];
  return employee;
};
