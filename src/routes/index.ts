import { Router } from "express";

import companiesRouter from "./companies/routes.companies";
import usersRouter from "./users/routes.users";
import sessionRouter from "./session/routes.session";

const router = Router();

router.use("/co", companiesRouter);

router.use("/u", usersRouter);

router.use("/ses", sessionRouter);

export default router;
