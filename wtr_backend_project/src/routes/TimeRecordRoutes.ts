/**
 * @swagger
 * tags:
 *   name: Time Records
 *   description: Operations related to time records
 */

/**
 * @swagger
 * /projects/time-records/{project_id}/check-in:
 *   post:
 *     summary: Check in a time record
 *     tags: [Time Records]
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
 *               location:
 *                 type: string
 *               check_in_timestamp:
 *                 type: string
 *             example:
 *                location: "Salvador, Bahia, Brazil"
 *                check_in_timestamp: "2023-08-22 13:57:40"
 *     responses:
 *       '200':
 *         description: Successfully checked in a time record.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/time-records/{project_id}/check-out:
 *   put:
 *     summary: Check out a time record
 *     tags: [Time Records]
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
 *         description: Successfully checked out a time record.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               check_out_timestamp:
 *                 type: string
 *             example:
 *                check_out_timestamp: "2023-08-22 13:57:40"
 */


/**
 * @swagger
 * /projects/time-records/{project_id}/justification:
 *   post:
 *     summary: Creates a checkout justitification request to be approved by an admin or project manager
 *     tags: [Time Records]
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
 *               location:
 *                 type: string
 *               updated_timestamp:
 *                 type: string
 *               justification_type:
 *                 type: string
 *                 enum: ["CHECKIN", "CHECKOUT"]
 *               justification_file:
 *                 type: string
 *                 format: binary
 *             example:
 *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
 *                location: "Salvador, Bahia, Brazil"
 *                updated_timestamp: "2023-08-22 13:57:40"
 *                time_record_id: 1
 *                justification_type: CHECKIN
 *     responses:
 *       '201':
 *         description: Successfully created a time record justification.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: NotFound. Time record not found
 */

/**
 * @swagger
 * /projects/time-records/{project_id}/justification:
 *   get:
 *     summary: Gets a list of justitifications request to be approved by an admin or project manager
 *     tags: [Time Records]
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
 * /projects/time-records/{project_id}/justification/{justification_id}:
 *   get:
 *     summary: Gets a  time record justitification request to be approved by an admin or project manager
 *     tags: [Time Records]
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
 * /projects/time-records/{project_id}/justification/{justification_id}/assess:
 *   patch:
 *     summary: Assesses a time record justification request
 *     tags: [Time Records]
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
 *         description: Successfully assessed the time record justification
 *      
 */

import { Router } from "express";
import TimeRecordController from "../controllers/TimeRecordController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body, query } from "express-validator";
import multer from "multer";

export default class TimeRecordRoutes extends ProjectRelatedRoutes {
  
  constructor(
    protected controller: TimeRecordController = new TimeRecordController(),
    private readonly storage = multer({storage: multer.memoryStorage()})
  ) {
    super(controller);
  }

  get router(): Router {
    this._router.post(
      "/:project_id/check-in",
      [
        ...this.projectIdValidation,
        body("location").isString().withMessage("localizacao invalida"), // change that later, validate geophaphic location
        body("check_in_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.controller.checkInTimeRecord
    );

    this._router.put(
      "/:project_id/check-out",
      [
        ...this.projectIdValidation,
        body("check_out_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.controller.checkOutTimeRecord
    );
 
    this._router.post(
      "/:project_id/justification",
      this.storage.single('justification_file'),
      [
        ...this.projectIdValidation,
        body('time_record_id')
          .isNumeric()
          .withMessage("Id do time record no formato inválido"),
        body("user_message")
          .isString()
          .withMessage("mensagem invalida")
          .isLength({ max: 500 })
          .withMessage(
            "mensagem de check-in ultrapassou o limite de 500 caracteres"
          ),
        body("location").isString().withMessage("localizacao invalida"), // change that later, validate geophaphic location
        body("updated_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
        body("justification_type")
          .isString()
          .withMessage("Tipo de justificativa inválida")
      ],
      this.validate,
      this.controller.createTimeRecordJustification,
    );
    
    this._router.get(
      "/:project_id/justification",
      [
        ...this.projectIdValidation,
      ],
      this.validate,
      this.controller.getProjectTimeRecordsJustifications,
    );

    this._router.get(
      "/:project_id/justification/:justification_id",
      [
        ...this.projectIdValidation,
        query('status')
          .isString()
          .optional()
          .withMessage("Formato de status invalido")
      ],
      this.validate,
      this.controller.getProjectTimeRecordJustification,
    );
    

    this._router.patch(
      "/:project_id/justification/:justification_id/assess",
      [
        ...this.projectIdValidation,
        body("status")
          .isString()
          .withMessage("Formato de status inválido"),
        body("manager_message")
          .isString()
          .withMessage("Formato de messagem inválido")
      ],
      this.validate,
      this.controller.assessTimeRecordJustification,
    );
    
    return this._router
  }

  
}
