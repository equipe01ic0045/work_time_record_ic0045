import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authorize from "../middlewares/authorize";
import AuthorizedRequest from "../interfaces/AuthorizedRequest";
import { Response } from "express";

const router = Router();

const authController = new AuthController()
router.post("/register", authController.registerUser.bind(authController))
router.post("/login", authController.loginUser.bind(authController))



// // Protected endpoint example
// router.get('/protected', authorize, (req:AuthorizedRequest, res:Response) => {
//     // The user is authorized, and their information is available as req.user
//     res.json({ message: 'Protected endpoint accessed by user ' + req.user?.userId });
//   });


export default router;
