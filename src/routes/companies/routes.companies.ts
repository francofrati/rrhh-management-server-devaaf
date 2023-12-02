import { Router } from "express";

import { createCompanieController } from "../../controllers/controller.companies";
import { validateNewCompanyData } from "../../middlewares/middleware.companies";

const router = Router();

router.post("/new", validateNewCompanyData, createCompanieController);

export default router;
