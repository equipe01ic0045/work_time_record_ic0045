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
 *               project_description:
 *                 type: string
 *               location_required:
 *                 type: boolean
 *               commercial_time_required:
 *                 type: boolean
 *               timezone:
 *                 type: string
 *               location:
 *                 type: string
 *               commercial_time_start:
 *                 type: integer
 *               commercial_time_end:
 *                 type: integer
 *             example:
 *               project_name: projeto-legal
 *               project_description: esta e uma descricao do projeto
 *               location_required: true
 *               commercial_time_required: true
 *               timezone: America/Bahia
 *               location: Salvador, Bahia
 *               commercial_time_start: 480
 *               commercial_time_end: 1080
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
 * /projects:
 *   put:
 *     summary: Update a project
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
 *               project_id:
 *                 type: integer
 *               project_name:
 *                 type: string
 *               project_description:
 *                 type: string
 *               location_required:
 *                 type: boolean
 *               commercial_time_required:
 *                 type: boolean
 *               timezone:
 *                 type: string
 *               location:
 *                 type: string
 *               commercial_time_start:
 *                 type: integer
 *               commercial_time_end:
 *                 type: integer
 *             example:
 *               project_id: 1
 *               project_name: projeto-legal
 *               project_description: esta e uma descricao do projeto
 *               location_required: true
 *               commercial_time_required: true
 *               timezone: America/Bahia
 *               location: Salvador, Bahia
 *               commercial_time_start: 480
 *               commercial_time_end: 1080
 *     responses:
 *       '201':
 *         description: Successfully updated a project.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects:
 *   delete:
 *     summary: Delete a project
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
 *               project_id:
 *                 type: integer
 *             example:
 *               project_id: 1
 *     responses:
 *       '201':
 *         description: Successfully deleted a project.
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
 *               user_email:
 *                 type: string
 *               user_role:
 *                 type: string
 *               user_hours_per_week:
 *                 type: integer
 *             example:
 *               user_email: "teste@email.com"
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
 *               user_email:
 *                 type: string
 *               user_role:
 *                 type: string
 *               user_hours_per_week:
 *                 type: integer
 *             example:
 *               user_email: "teste@email.com"
 *               user_role: "ADMIN"
 *               user_hours_per_week: 20
 *     responses:
 *       '200':
 *         description: Successfully updated the user's role in the project.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/{project_id}/{user_id}:
 *   delete:
 *     summary: Deletes an user
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
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The ID of the user to be removed.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the user.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

import ProjectController from "../controllers/ProjectController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body, param } from "express-validator";
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
            'Nomes de projeto devem ter apenas letras minúsculas e números separados por hífen'
          ),
        body("project_description")
          .isString()
          .withMessage("Descricao do projeto requerida"),
        body("location")
          .isString()
          .custom((value: string) => /^[a-zA-z ]+$/.test(value))
          .withMessage("Localização deve conter apenas letras maiúsculas, minúsculas e espaço."),
        body('commercial_time_end')
          .custom((value, {req}) => parseInt(value) > req.body.commercial_time_start)
          .withMessage("O horario fim deve ser maior que o horario começo."),
      ],
      this.validate,
      this.controller.createNewProject
    );
    this._router.put(
      "/",
      [
        body("project_name")
          .notEmpty()
          .withMessage("Nome do projeto requerido")
          .custom((value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          .withMessage(
            'Nome do projeto inválido. Nomes de projeto devem ter apenas letras minúsculas e números separados por hífen, examplo: "examplo-nome-de-projeto-32"'
          ),
          body("project_description")
            .isString()
            .withMessage("Descricao do projeto requerida")
      ],
      this.validate,
      this.controller.updateProject
    );

    this._router.delete(
      "/",
      [
        body("project_id")
          .notEmpty()
          .custom((value: string) => /^[0-9]+$/.test(value))
          .withMessage(
            'ID do projeto inválido'
          ),
      ],
      this.validate,
      this.controller.deleteProject
    );

    this._router.get(
      "/:project_id",
      ...this.projectIdValidation,
      this.validate,
      this.controller.getProjectInfo
    );

    this._router.get(
      "/:project_id/users",
      ...this.projectIdValidation,
      this.validate,
      this.controller.getProjectUsers
    );

    const userProjectRoleValidation = [
      ...this.projectIdValidation,
      body("user_email").isEmail().withMessage("Email do usuario inválido"),
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
    
    
    this._router.delete("/:project_id/:user_id",
      [
        ...this.projectIdValidation,
        param("user_id")
          .toInt()
          .notEmpty()
          .withMessage("Id do usuário a ser removido em branco"),
      ],
      this.validate,
      this.controller.deleteUser
    );


    return this._router;
  }
}
