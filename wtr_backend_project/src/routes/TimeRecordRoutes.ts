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
 *               user_message:
 *                 type: string
 *               location:
 *                 type: string
 *               check_in_timestamp:
 *                 type: string
 *             example:
 *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
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
 * /projects/time-records/{project_id}/check-in/justification:
 *   post:
 *     summary: Opens a checkin justitification request to be approved by an admin or project manager
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
 *               check_in_timestamp:
 *                 type: string
 *               justification_file:
 *                 type: string
 *                 format: binary
 *             example:
 *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
 *                location: "Salvador, Bahia, Brazil"
 *                check_out_timestamp: "2023-08-22 13:57:40"
 *     responses:
 *       '200':
 *         description: Successfully checked in a time record.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /projects/time-records/{project_id}/check-out/justification:
 *   post:
 *     summary: Opens a checkout justitification request to be approved by an admin or project manager
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
 *               check_out_timestamp:
 *                 type: string
 *               justification_file:
 *                 type: string
 *                 format: binary
 *             example:
 *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
 *                location: "Salvador, Bahia, Brazil"
 *                check_out_timestamp: "2023-08-22 13:57:40"
 *     responses:
 *       '200':
 *         description: Successfully checked in a time record.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 */

import { Router } from "express";
import TimeRecordController from "../controllers/TimeRecordController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body } from "express-validator";
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
        body("user_message")
          .isString()
          .withMessage("mensagem invalida")
          .isLength({ max: 500 })
          .withMessage(
            "mensagem de check-in ultrapassou o limite de 500 caracteres"
          ),
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
      "/:project_id/check-in/justification",
      this.storage.single('justification_file'),
      [
        ...this.projectIdValidation,
        body("user_message")
          .isString()
          .withMessage("mensagem invalida")
          .isLength({ max: 500 })
          .withMessage(
            "mensagem de check-in ultrapassou o limite de 500 caracteres"
          ),
        body("location").isString().withMessage("localizacao invalida"), // change that later, validate geophaphic location
        body("check_in_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.controller.checkinJustificationRequest,
    );
    
    this._router.post(
      "/:project_id/check-out/justification",
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
        body("check_out_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.controller.checkoutJustificationRequest,
    );
    
    return this._router
  }

  
}
