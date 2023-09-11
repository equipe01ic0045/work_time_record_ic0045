import { Router } from "express";
import authorize from "../middlewares/authorize";
import ProjectController from "../controllers/ProjectController";

const router = Router();
const projectController = new ProjectController();

router.post("/", authorize, projectController.createNewProject);
router.get("/", authorize, projectController.getUserProjects);
router.post(
  "/:project_id/users",
  authorize,
  projectController.addUserToProject
);
router.get("/:project_id/users", authorize, projectController.getProjectUsers);
router.put("/:project_id/users", authorize, projectController.updateUserRole);

export default router;
