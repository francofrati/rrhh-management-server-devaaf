import { Router } from "express";

import { addNewUserController } from "../../controllers/controller.users";
import { validateNewUserData } from "../../middlewares/middleware.users";

const router = Router();

router.post("/new", validateNewUserData, addNewUserController);

export default router;
