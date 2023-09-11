import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

export default router;
