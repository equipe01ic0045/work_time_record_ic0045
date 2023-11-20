/**
 * @swagger
 * tags:
 *   name: Justifications
 *   description: Operations related to Justifications
 */

/**
 * @swagger
 * /projects/justification/{project_id}:
 *   post:
 *     summary: Creates a checkout justification request to be approved by an admin or project manager
 *     tags: [Justifications]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               time_record_id:
 *                 type: string
 *               user_message:
 *                 type: string
 *               justification_type:
 *                 type: string
 *                 enum: ["CHECKIN", "CHECKOUT"]
 *               justification_file:
 *                 type: string
 *                 format: binary
 *             example:
 *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
 *                time_record_id: 1
 *                justification_type: CHECKIN
 *     responses:
 *       '201':
 *         description: Successfully created a justification.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: NotFound. Time record not found
 */

/**
 * @swagger
 * /projects/justification/{project_id}:
 *   get:
 *     summary: Gets a list of justifications request to be approved by an admin or project manager
 *     tags: [Justifications]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: The status of the request
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully received a list containing the time record jusitification associated with the project
 *       '401':
 *         description: User does not have permission to list
 *
 */

/**
 * @swagger
 * /projects/justification/{project_id}/record/{justification_id}:
 *   get:
 *     summary: Gets a  justification request to be approved by an admin or project manager
 *     tags: [Justifications]
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
 *         name: justification_id
 *         required: true
 *         description: The ID of the justification.
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Successfully checked in a time record.
 *      '401':
 *        description: Unauthorized. User not logged or doesn't have administrative level required to view the justitication
 */

/**
 * @swagger
 * /projects/justification/{project_id}/record/{justification_id}/review:
 *   post:
 *     summary: review a justification request
 *     tags: [Justifications]
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
 *         name: justification_id
 *         required: true
 *         description: The ID of the justification.
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                enum: ["APPROVED", "DENIED", "CANCELLED"]
 *              manager_message:
 *                type: string
 *     responses:
 *      '200':
 *         description: Successfully reviewed the justification
 *
 */

/**
 * @swagger
 * /projects/justification/{project_id}/record/{justification_id}/document:
 *   get:
 *     summary: Gets a justification document file
 *     tags: [Justifications]
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
 *         name: justification_id
 *         required: true
 *         description: The ID of the justification.
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Successfully fetched the file.
 *      '401':
 *        description: Unauthorized. User not logged or doesn't have administrative level required to view the justitication document
 */

import { Router } from "express";
import JustificationController from "../controllers/JustificationController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body, query } from "express-validator";
import multer from "multer";

export default class JustificationRoutes extends ProjectRelatedRoutes {
  constructor(
    protected controller: JustificationController = new JustificationController(),
    private readonly storage = multer({ storage: multer.memoryStorage() })

  ) {
    super(controller);
  }

  get router(): Router {
    this._router.post(
      "/:project_id",
      this.storage.single("justification_file"),
      [
        ...this.projectIdValidation,
        body("time_record_id")
          .isNumeric()
          .withMessage("Id do time record no formato inválido"),
        body("user_message")
          .isString()
          .withMessage("mensagem invalida")
          .isLength({ max: 500 })
          .withMessage(
            "mensagem de check-in ultrapassou o limite de 500 caracteres"
          ),
        body("justification_type")
          .isString()
          .withMessage("Tipo de justificativa inválida"),
      ],
      this.validate,
      this.controller.createJustification
    );

    this._router.get(
      "/:project_id",
      [...this.projectIdValidation],
      this.validate,
      this.controller.getProjectJustifications
    );

    this._router.get(
      "/:project_id/record/:justification_id",
      [
        ...this.projectIdValidation,
        query("status")
          .isString()
          .optional()
          .withMessage("Formato de status invalido"),
      ],
      this.validate,
      this.controller.getProjectJustification
    );

    this._router.post(
      "/:project_id/record/:justification_id/review",
      [
        ...this.projectIdValidation,
        body("status").isString().withMessage("Formato de status inválido"),
        body("reviewer_message")
          .isString()
          .withMessage("Formato de messagem inválido"),
      ],
      this.validate,
      this.controller.reviewJustification
    );

    this._router.get(
      "/:project_id/record/:justification_id/document",
      [...this.projectIdValidation],
      this.validate,
      this.controller.getJustificationDocument
    );

    return this._router;
  }
}
