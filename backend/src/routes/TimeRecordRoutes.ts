/**
 * @swagger
 * tags:
 *   name: Time Records
 *   description: Operations related to time records
 */

import { Router } from "express";
import TimeRecordController from "../controllers/TimeRecordController";
import ProjectRelatedRoutes from "./abstract/ProjectRelatedRoutes";
import { body, param } from "express-validator";
import multer from "multer";

export default class TimeRecordRoutes extends ProjectRelatedRoutes {
  constructor(
    protected controller: TimeRecordController = new TimeRecordController(),
    private readonly storage = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 1024 * 1024 },
    })
  ) {
    super(controller);
  }

  get router(): Router {
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
      this.controller.simpleCheckIn
    );

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
      this.controller.simpleCheckOut
    );

    /**
     * @swagger
     * /projects/time-records/{project_id}:
     *   get:
     *     summary: Get user time records in a project
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
     */
    this._router.get(
      "/:project_id",
      [...this.projectIdValidation],
      this.validate,
      this.controller.getUserTimeRecordsInProject
    );

    /**
     * @swagger
     * /projects/time-records/{project_id}/check-in/detailed:
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
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               check_in_timestamp:
     *                 type: string
     *               user_message:
     *                 type: string
     *               justification_file:
     *                 type: string
     *                 format: binary
     *             example:
     *                check_in_timestamp: "2023-08-22 13:57:40"
     *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
     *                location: "Salvador Bahia Brazil"
     *     responses:
     *       '200':
     *         description: Successfully checked out a time record.
     *       '401':
     *         description: Unauthorized. User is not authenticated.
     */
    this._router.post(
      "/:project_id/check-in/detailed",
      this.storage.single("justification_file"),
      [...this.projectIdValidation],
      this.validate,
      this.controller.detailedCheckIn
    );

    /**
     * @swagger
     * /projects/time-records/{project_id}/check-out/detailed:
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
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               check_out_timestamp:
     *                 type: string
     *               user_message:
     *                 type: string
     *               location:
     *                 type: string
     *               justification_file:
     *                 type: string
     *                 format: binary
     *             example:
     *                check_out_timestamp: "2023-08-22 13:57:40"
     *                user_message: "fiz o check-in de 1 hora atrás, mal 🫡"
     *                location: "Salvador Bahia Brazil"
     *     responses:
     *       '200':
     *         description: Successfully checked out a time record.
     *       '401':
     *         description: Unauthorized. User is not authenticated.
     */
    this._router.put(
      "/:project_id/check-out/detailed",
      this.storage.single("justification_file"),
      [...this.projectIdValidation],
      this.validate,
      this.controller.detailedCheckOut
    );

    /**
     * @swagger
     * /projects/time-records/info/{time_record_id}:
     *   get:
     *     summary: Get a time record
     *     tags: [Time Records]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: time_record_id
     *         required: true
     *         description: The ID of the time record.
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully returned the time record.
     */
    this._router.get(
      "/info/:time_record_id",
      [
        param("time_record_id")
          .isInt()
          .withMessage("ID do time record deve ser um inteiro"),
      ],
      this.validate,
      this.controller.getTimeRecordInfo
    );


    /**
     * @swagger
     * /projects/time-records/info/list/user:
     *   get:
     *     summary: Get a user projects with last time record
     *     tags: [Time Records]
     *     security:
     *       - CookieAuth: []
     *     responses:
     *       '200':
     *         description: Successfully returned the proejcts with time records.
     */
    this._router.get("/info/list/user", this.controller.getTimeRecordsList);

    return this._router;
  }
}
