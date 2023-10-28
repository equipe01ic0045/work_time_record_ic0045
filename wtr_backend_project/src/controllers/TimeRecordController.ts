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

  async checkinJustificationRequest(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const {
      project_id,
    } = req.params;

    const {
      check_in_timestamp,
      location,
      user_message,
      time_record_id,
    } = req.body;

    const fileType = req.file!.mimetype;
    const fileSize = req.file!.size;
    const fileBuffer = req.file!.buffer;
    const fileName = req.file!.originalname;

    try {
      const data = await timeRecordService.checkinJustificationRequest(
        +project_id,
        +time_record_id,
        req.user!.userId,
        user_message,
        fileName,
        fileType,
        fileSize,
        fileBuffer,
        check_in_timestamp,
        location,
      );

      new ResourceCreatedResponse().send(res, data);
    } catch (err) {
      next(err);
    }
  }
  
  async checkoutJustificationRequest(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ) {

    const {
      project_id,
    } = req.params;

    const {
      check_out_timestamp,
      location,
      user_message,
      time_record_id,
    } = req.body;

    const fileType = req.file!.mimetype;
    const fileSize = req.file!.size;
    const fileBuffer = req.file!.buffer;
    const fileName = req.file!.originalname;

    try {
      const data = await timeRecordService.checkoutJustificationRequest(
        +project_id,
        +time_record_id,
        req.user!.userId,
        user_message,
        fileName,
        fileType,
        fileSize,
        fileBuffer,
        check_out_timestamp,
        location,
      );

      new ResourceCreatedResponse().send(res, data);
    } catch (err) {
      next(err);
    }
  }

  // TODO FINISH LISTING JUSTIFICATIONS
  async listTimeRecordsJustificationRequests(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ) {
    

  }
}
