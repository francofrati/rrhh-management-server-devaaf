import { Router } from "express";

import {
  addNewEmployeeController,
  getEmployeesByCompanyController,
  getEmployeeController,
} from "../../controllers/controller.employees";

import { isAuthUser } from "../../middlewares/isAuthUser";
import { userBelongsToCompany } from "../../middlewares/middleware.companies";
import { validateNewEmployeeData } from "../../middlewares/middleware.employees";

const router = Router();

// Add user by company
router.use(
  "/new/co/:companyId",
  isAuthUser,
  userBelongsToCompany,
  validateNewEmployeeData,
  addNewEmployeeController
);

// Get employees by company
router.post(
  "/co/:companyId",
  isAuthUser,
  userBelongsToCompany,
  getEmployeesByCompanyController
);

// Get an employee by id and by company id
router.post(
  "/:employeeId/co/:companyId",
  isAuthUser,
  userBelongsToCompany,
  getEmployeeController
);

export default router;
