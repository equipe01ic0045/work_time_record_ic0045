import BaseController from "./abstract/BaseController";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { timeRecordService } from "../services";
import {
  DataRetrievedResponse,
  ErrorResponse,
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
} from "../types/responses";

export default class TimeRecordController extends BaseController {
  async getUserTimeRecordsInProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;

    try {
      const timeRecords = await timeRecordService.getUserTimeRecordsInProject(
        req.user!.userId,
        parseInt(project_id)
      );
      new DataRetrievedResponse().send(res, timeRecords);
    } catch (error) {
      next(error);
    }
  }

  async simpleCheckIn(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { location, check_in_timestamp } = req.body;
    try {
      let checkInTimestamp: Date = new Date(check_in_timestamp);
      await timeRecordService.simpleCheckIn(
        req.user!.userId,
        parseInt(project_id),
        checkInTimestamp,
        location
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async simpleCheckOut(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { check_out_timestamp } = req.body;
    try {
      let checkOutTimestamp: Date = new Date(check_out_timestamp);
      await timeRecordService.simpleCheckout(
        req.user!.userId,
        parseInt(project_id),
        checkOutTimestamp
      );
      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async detailedCheckIn(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { check_in_timestamp, user_message, location } = req.body;

    try {
      let checkInTimestamp: Date = new Date(check_in_timestamp);

      console.log(project_id,
      check_in_timestamp,
      user_message)

      await timeRecordService.detailedCheckIn(
        req.user!.userId,
        parseInt(project_id),
        checkInTimestamp,
        user_message,
        req.file?.originalname,
        req.file?.mimetype,
        req.file?.buffer,
        location
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async detailedCheckOut(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const { check_out_timestamp, user_message } = req.body;

    try {
      let checkOutTimestamp: Date = new Date(check_out_timestamp);
      await timeRecordService.detailedCheckOut(
        req.user!.userId,
        parseInt(project_id),
        checkOutTimestamp,
        user_message,
        req.file?.originalname,
        req.file?.mimetype,
        req.file?.buffer
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async getTimeRecordInfo(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { time_record_id } = req.params;
    try {
      const timeRecord = await timeRecordService.getTimeRecordInfo(
        parseInt(time_record_id)
      );
      new DataRetrievedResponse().send(res, timeRecord);
    } catch (error) {
      next(error);
    }
  }

  async updateTimeRecordInfo(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { time_record_id } = req.params;
    const {
      check_in_timestamp,
      check_out_timestamp,
      user_message,
      reviewer_message,
      status,
    } = req.body;

    try {
      await timeRecordService.updateTimeRecordInfo(
        parseInt(time_record_id),
        check_in_timestamp,
        check_out_timestamp,
        user_message,
        reviewer_message,
        status,
        req.file?.originalname,
        req.file?.mimetype,
        req.file?.buffer
      );
      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async getTimeRecordsList(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const timeRecords = await timeRecordService.getUserProjectTimeRecords(
        req.user!.userId
      );
      new DataRetrievedResponse().send(res, timeRecords);
    } catch (error) {
      next(error);
    }
  }
}
