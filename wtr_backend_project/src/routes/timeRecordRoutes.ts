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

import { Router } from "express";
import authorize from "../middlewares/authorize";
import TimeRecordController from "../controllers/TimeRecordController";

const router = Router();

const timeRecordController = new TimeRecordController();
router.post(
  "/:project_id/check-in",
  authorize,
  timeRecordController.checkInTimeRecord
);
router.put(
  "/:project_id/check-out",
  authorize,
  timeRecordController.checkOutTimeRecord
);

export default router;
