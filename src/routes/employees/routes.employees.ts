import { Router } from "express";

import { addNewEmployeeController } from "../../controllers/controller.employees";

import { isAuthUser } from "../../middlewares/isAuthUser";
import { userBelongsToCompany } from "../../middlewares/middleware.companies";
import { validateNewEmployeeData } from "../../middlewares/middleware.employees";

const router = Router();

router.use(
  "/new/:companyId",
  isAuthUser,
  userBelongsToCompany,
  validateNewEmployeeData,
  addNewEmployeeController
);

export default router;
