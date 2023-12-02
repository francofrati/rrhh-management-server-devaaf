import { Router } from "express";

import companiesRouter from "./companies/routes.companies";
import { validateNewCompanyData } from "../middlewares/middleware.companies";

const router = Router();

router.use("/co", companiesRouter);

export default router;
