/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operations related to projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get the projects of the authenticated user
 *     tags: [Projects]
 *     security:
 *       - CookieAuth: [] 
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user's projects.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - CookieAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *             example:
 *               project_name: projeto-legal
 *     responses:
 *       '201':
 *         description: Successfully created a new project.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/{project_id}/users:
 *   post:
 *     summary: Add a user to a project
 *     tags: [Projects]
 *     security:
 *       - CookieAuth: [] 
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               user_role:
 *                 type: string
 *               user_hours_per_week:
 *                 type: integer
 *             example:
 *               user_id: 2
 *               user_role: "MANAGER"
 *               user_hours_per_week: 40
 *     responses:
 *       '201':
 *         description: Successfully added a user to the project.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/{project_id}/users:
 *   get:
 *     summary: Get the users of a project
 *     tags: [Projects]
 *     security:
 *       - CookieAuth: [] 
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the project's users.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/{project_id}/users:
 *   put:
 *     summary: Update a user's role in a project
 *     tags: [Projects]
 *     security:
 *       - CookieAuth: [] 
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               new_role:
 *                 type: string
 *               new_hours_per_week:
 *                 type: integer
 *             example:
 *               user_id: 12345
 *               new_role: "ADMIN"
 *               new_hours_per_week: 20
 *     responses:
 *       '200':
 *         description: Successfully updated the user's role in the project.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

import { Router } from "express";
import authorize from "../middlewares/authorize";
import ProjectController from "../controllers/ProjectController";

const router = Router();
const projectController = new ProjectController();

router.get("/", authorize, projectController.getUserProjects);
router.post("/", authorize, projectController.createNewProject);
router.post(
  "/:project_id/users",
  authorize,
  projectController.addUserToProject
);
router.get("/:project_id/users", authorize, projectController.getProjectUsers);
router.put("/:project_id/users", authorize, projectController.updateUserRole);

export default router;
