import { Router } from "express";
import authorize from "../middlewares/authorize";
import AuthController from "../controllers/AuthController";
import ProjectController from "../controllers/ProjectController";
import TimeRecordController from "../controllers/TimeRecordController";

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
  "/projects/:project_id/addUser",
  authorize,
  projectController.addUserToProject.bind(projectController)
);
router.get(
  "/projects/:project_id/users",
  authorize,
  projectController.getProjectUsers.bind(projectController)
);
router.put(
  "/projects/:project_id/users",
  authorize,
  projectController.updateUserRole.bind(projectController)
);

const timeRecordController = new TimeRecordController()
router.post(
  "/projects/:project_id/checkIn",
  authorize,
  timeRecordController.checkInTimeRecord.bind(timeRecordController)
);
router.put(
  "/projects/:project_id/checkOut",
  authorize,
  timeRecordController.checkOutTimeRecord.bind(timeRecordController)
);


// // Protected endpoint example
// router.get("/protected", authorize, (req: AuthorizedRequest, res: Response) => {
//   // The user is authorized, and their information is available as req.user
//   res.json({
//     message: "Protected endpoint accessed by user " + req.user?.userId,
//   });
// });

export default router;
