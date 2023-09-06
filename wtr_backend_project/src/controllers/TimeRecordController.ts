import AuthorizedRequest from "../interfaces/AuthorizedRequest";
import { Response } from "express";
import { timeRecordService } from "../prisma/services";

export default class TimeRecordController {
  async checkInTimeRecord(req: AuthorizedRequest, res: Response) {
    const { project_id } = req.params;
    const { user_message, location } = req.body;

    await timeRecordService.checkInTimeRecord(
      req.user!.userId,
      parseInt(project_id),
      user_message,
      location
    );

    res.status(201).json({ message: "Check-in feito com sucesso." });
  }

  async checkOutTimeRecord(req: AuthorizedRequest, res: Response) {
    const { project_id } = req.params;

    await timeRecordService.checkOutTimeRecord(
      req.user!.userId,
      parseInt(project_id)
    );

    res.status(201).json({ message: "Check-out feito com sucesso." });
  }
}
