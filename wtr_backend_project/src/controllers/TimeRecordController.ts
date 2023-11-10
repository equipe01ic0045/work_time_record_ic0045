import BaseController from "./abstract/BaseController";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { timeRecordService } from "../services";
import {
  DataRetrievedResponse,
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

  async createTimeRecordJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;

    const {
      updated_timestamp,
      location,
      user_message,
      time_record_id,
      justification_type,
    } = req.body;

    const fileType = req.file!.mimetype;
    const fileSize = req.file!.size;
    const fileBuffer = req.file!.buffer;
    const fileName = req.file!.originalname;

    try {
      const data = await timeRecordService.createTimeRecordJustification(
        +project_id,
        +time_record_id,
        req.user!.userId,
        user_message,
        fileName,
        fileType,
        fileSize,
        fileBuffer,
        justification_type,
        updated_timestamp,
        location
      );

      new ResourceCreatedResponse().send(res, data);
    } catch (err) {
      next(err);
    }
  }

  // TODO FINISH LISTING JUSTIFICATIONS
  async getProjectTimeRecordsJustifications(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const statusQueryString = req.query.status?.toString();
    const status = statusQueryString?.split(",");
    const { project_id } = req.params;
    try {
      const foundProjectTimeRecords =
        await timeRecordService.getProjectTimeRecordsJustifications(
          req.user!.userId,
          +project_id,
          status
        );
      new DataRetrievedResponse().send(res, foundProjectTimeRecords);
    } catch (err) {
      next(err);
    }
  }

  async getProjectTimeRecordJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const projectId = +req.params!.project_id;
      const timeRecordJustificationId =
        +req.params!.justification_id;
      const foundTimeRecordRequest =
        await timeRecordService.getProjectTimeRecordJustification(
          userId,
          projectId,
          timeRecordJustificationId
        );
      new DataRetrievedResponse().send(res, foundTimeRecordRequest);
    } catch (err) {
      next(err);
    }
  }

  async assessTimeRecordJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, manager_message } = req.body;
      const { project_id, justification_id } = req.params;
      const updatedTimeRecordJustification =
        await timeRecordService.assessProjectTimeRecordJustification(
          +project_id,
          req.user!.userId,
          +justification_id,
          status,
          manager_message
        );
      new ResourceUpdatedResponse().send(res, updatedTimeRecordJustification);
    } catch (err) {
      next(err);
    }
  }
}
