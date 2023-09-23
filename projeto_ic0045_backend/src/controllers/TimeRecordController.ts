import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { timeRecordService } from "../prisma/services";
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";
import ResourceUpdatedResponse from "../types/responses/ResourceUpdatedResponse";

export default class TimeRecordController {
  async checkInTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id } = req.params;
      const { user_message, location, check_in_timestamp } = req.body;

      let checkInTimestamp: Date = new Date(check_in_timestamp);
      checkInTimestamp = !isNaN(checkInTimestamp.getTime())
        ? checkInTimestamp
        : new Date(); // if checkin timestamp is invalid, new date

      await timeRecordService.checkInTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkInTimestamp,
        user_message,
        location
      );
      new ResourceCreatedResponse().send(res)
    } catch (error) {
      next(error);
    }
  }

  async checkOutTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id } = req.params;
      const { check_out_timestamp } = req.body;

      let checkOutTimestamp: Date = new Date(check_out_timestamp);
      checkOutTimestamp = !isNaN(checkOutTimestamp.getTime())
        ? checkOutTimestamp
        : new Date(); // if checkout timestamp is invalid, new date

      await timeRecordService.checkOutTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkOutTimestamp
      );
      new ResourceUpdatedResponse().send(res)
    } catch (error) {
      next(error);
    }
  }
}
