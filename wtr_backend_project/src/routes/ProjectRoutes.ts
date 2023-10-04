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

import ProjectController from "../controllers/ProjectController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body } from "express-validator";
import { UserRole } from "@prisma/client";
import { Router } from "express";

export default class ProjectRoutes extends ProjectRelatedRoutes {
  constructor(
    protected controller: ProjectController = new ProjectController()
  ) {
    super(controller);
  }

  get router(): Router {
    this._router.get("/", this.controller.getUserProjects);
    this._router.post(
      "/",
      [
        body("project_name")
          .notEmpty()
          .withMessage("Nome do projeto requerido")
          .custom((value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          .withMessage(
            'Nome do projeto inválido. Nomes de projeto devem ter apenas letras minúsculas e números separados por hífen, examplo: "examplo-nome-de-projeto-32"'
          ),
      ],
      this.validate,
      this.controller.createNewProject
    );

    this._router.get(
      "/:project_id/users",
      ...this.projectIdValidation,
      this.validate,
      this.controller.getProjectUsers
    );

    const userProjectRoleValidation = [
      ...this.projectIdValidation,
      body("user_id").isInt().withMessage("ID do usuario deve ser um inteiro"),
      body("user_role")
        .custom((value: string) =>
          Object.values(UserRole).includes(value as UserRole)
        )
        .withMessage("role invalida"),
      body("user_hours_per_week")
        .isInt()
        .withMessage("horas de trabalho deve ser numero inteiro"),
    ];

    this._router.post(
      "/:project_id/users",
      userProjectRoleValidation,
      this.validate,
      this.controller.addUserToProject
    );

    this._router.put(
      "/:project_id/users",
      userProjectRoleValidation,
      this.validate,
      this.controller.updateUserRole
    );

    return this._router
  }
}
