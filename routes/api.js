import { Router } from "express";

import AuthController from "../Controller/AuthController.js";

const router = Router()

router.post("/auth/register/", AuthController.registerUser)
router.post("/auth/login/", AuthController.Login)





export default router;