import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { timeRecordService } from "../prisma/services";
import { ProjectRelatedController } from "./ProjectRelatedController"
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";
import ResourceUpdatedResponse from "../types/responses/ResourceUpdatedResponse";
import { body, param } from "express-validator";

export default class TimeRecordController extends ProjectRelatedController {
  protected initRoutes(): void {

    this.router.post(
      "/:project_id/check-in",
      [
        ...this.projectIdValidation,
        body("user_message")
          .isString()
          .withMessage("mensagem invalida")
          .isLength({ max: 500 })
          .withMessage(
            "mensagem de check-in ultrapassou o limite de 500 caracteres",
          ),
        body("location").isString().withMessage("localizacao invalida"), // change that later, validate geophaphic location
        body("check_in_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.checkInTimeRecord,
    );

    this.router.put(
      "/:project_id/check-out",
      [
        ...this.projectIdValidation,
        body("check_out_timestamp")
          .isISO8601()
          .toDate()
          .withMessage("datetime invalido"),
      ],
      this.validate,
      this.checkOutTimeRecord,
    );
  }

  async checkInTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { project_id } = req.params;
    const { user_message, location, check_in_timestamp } = req.body;
    try {
      let checkInTimestamp: Date = new Date(check_in_timestamp);
      checkInTimestamp = !isNaN(checkInTimestamp.getTime())
        ? checkInTimestamp
        : new Date(); // if checkin timestamp is invalid, new date

      await timeRecordService.checkInTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkInTimestamp,
        user_message,
        location,
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async checkOutTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { project_id } = req.params;
    const { check_out_timestamp } = req.body;
    try {
      let checkOutTimestamp: Date = new Date(check_out_timestamp);
      checkOutTimestamp = !isNaN(checkOutTimestamp.getTime())
        ? checkOutTimestamp
        : new Date(); // if checkout timestamp is invalid, new date

      await timeRecordService.checkOutTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkOutTimestamp,
      );
      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
