import { Router } from "express";

import companiesRouter from "./companies/routes.companies";
import usersRouter from "./users/routes.users";

const router = Router();

router.use("/co", companiesRouter);

router.use("/u", usersRouter);

export default router;
