import { Router, Response } from "express";
import authorize from "../middlewares/authorize";
import AuthController from "../controllers/AuthController";
import AuthorizedRequest from "../interfaces/AuthorizedRequest";
import ProjectController from "../controllers/ProjectController";

const router = Router();

const authController = new AuthController();
router.post("/register", authController.registerUser.bind(authController));
router.post("/login", authController.loginUser.bind(authController));

const projectController = new ProjectController();
router.post(
  "/projects",
  authorize,
  projectController.createNewProject.bind(projectController)
);
router.get(
  "/projects",
  authorize,
  projectController.getUserProjects.bind(projectController)
);
router.post(
  "/projects/addUser",
  authorize,
  projectController.addUserToProject.bind(projectController)
);

// Protected endpoint example
router.get("/protected", authorize, (req: AuthorizedRequest, res: Response) => {
  // The user is authorized, and their information is available as req.user
  res.json({
    message: "Protected endpoint accessed by user " + req.user?.userId,
  });
});

export default router;
