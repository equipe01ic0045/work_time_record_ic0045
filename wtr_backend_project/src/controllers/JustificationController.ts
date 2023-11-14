import BaseController from "./abstract/BaseController";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { justificationService } from "../services";
import {
  DataRetrievedResponse,
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
} from "../types/responses";

export default class JustificationController extends BaseController {
  async createJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;

    const {
      time_record_id,
      user_message,
      justification_type,
    } = req.body;

    const fileType = req.file!.mimetype;
    const fileSize = req.file!.size;
    const fileBuffer = req.file!.buffer;
    const fileName = req.file!.originalname;

    try {
      const data = await justificationService.createJustification(
        +project_id,
        +time_record_id,
        req.user!.userId,
        user_message,
        fileName,
        fileType,
        fileSize,
        fileBuffer,
        justification_type,
      );

      new ResourceCreatedResponse().send(res, data);
    } catch (err) {
      next(err);
    }
  }

  async getProjectJustifications(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    const statusQueryString = req.query.status?.toString();
    const status = statusQueryString?.split(",");
    try {
      const foundJustifications =
        await justificationService.getProjectJustifications(
          req.user!.userId,
          +project_id,
          status
        );
      new DataRetrievedResponse().send(res, foundJustifications);
    } catch (err) {
      next(err);
    }
  }

  async getProjectJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const projectId = +req.params!.project_id;
      const justificationId = +req.params!.justification_id;
      const foundTimeRecordRequest =
        await justificationService.getProjectJustification(
          userId,
          projectId,
          justificationId
        );
      new DataRetrievedResponse().send(res, foundTimeRecordRequest);
    } catch (err) {
      next(err);
    }
  }

  async reviewJustification(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id, justification_id } = req.params;
      const { status, manager_message } = req.body;
      const updatedTimeRecordJustification =
        await justificationService.reviewJustification(
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

  async getJustificationDocument(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id, justification_id } = req.params;
      const justificationDocument =
        await justificationService.getJustificationDocument(
          +project_id,
          req.user!.userId,
          +justification_id
        );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${justificationDocument.file_name}`
      );
      res.setHeader("Content-Type", "application/octet-stream");
      res.send(justificationDocument.document_file);
    } catch (err) {
      next(err);
    }
  }
}
