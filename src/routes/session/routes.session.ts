import { Router } from "express";

import { getAuthorizationController } from "../../controllers/controller.session";
import { isAuthUser } from "../../middlewares/isAuthUser";

const router = Router();

router.post("/au/", isAuthUser, getAuthorizationController);

export default router;
