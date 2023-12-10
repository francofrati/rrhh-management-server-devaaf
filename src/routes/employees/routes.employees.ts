import { Router } from "express";

import {
  addNewEmployeeController,
  getEmployeesByCompanyController,
} from "../../controllers/controller.employees";

import { isAuthUser } from "../../middlewares/isAuthUser";
import { userBelongsToCompany } from "../../middlewares/middleware.companies";
import { validateNewEmployeeData } from "../../middlewares/middleware.employees";

const router = Router();

router.use(
  "/new/co/:companyId",
  isAuthUser,
  userBelongsToCompany,
  validateNewEmployeeData,
  addNewEmployeeController
);

router.post(
  "/co/:companyId",
  isAuthUser,
  userBelongsToCompany,
  getEmployeesByCompanyController
);

export default router;
