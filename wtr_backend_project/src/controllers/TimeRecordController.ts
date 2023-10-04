import BaseController from "./abstract/BaseController";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { timeRecordService } from "../services";
import {
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
} from "../types/responses";

export default class TimeRecordController extends BaseController {
  async checkInTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { user_message, location, check_in_timestamp } = req.body;
    try {
      let checkInTimestamp: Date = new Date(check_in_timestamp);
      await timeRecordService.checkInTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkInTimestamp,
        user_message,
        location
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async checkOutTimeRecord(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { check_out_timestamp } = req.body;
    try {
      let checkOutTimestamp: Date = new Date(check_out_timestamp);
      await timeRecordService.checkOutTimeRecord(
        req.user!.userId,
        parseInt(project_id),
        checkOutTimestamp
      );
      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
