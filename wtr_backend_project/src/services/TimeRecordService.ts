import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import JustificationRepository from "../prisma/repositories/JustificationRepository";
import { JustificationType, time_record } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../types/errors";

export default class TimeRecordService {
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly projectsRepository: ProjectRepository;
  private readonly justificationRepository: JustificationRepository;
  private readonly allowedMimeTypes: Array<string>;

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.projectsRepository = new ProjectRepository();
    this.justificationRepository = new JustificationRepository();
    this.allowedMimeTypes = ["application/pdf"];
  }

  async getUserTimeRecordsInProject(userId: number, projectId: number) {
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }

    return this.timeRecordsRepository.getUserTimeRecordsInProject(
      userId,
      projectId
    );
  }

  async simpleCheckIn(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    location?: string
  ): Promise<time_record> {
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const existingCheckIn =
      await this.timeRecordsRepository.findOpenCheckinTimeRecord(
        userId,
        projectId
      );
    if (existingCheckIn) {
      throw new ConflictError("open check-in");
    }
    return this.timeRecordsRepository.checkInTimeRecord(
      userId,
      projectId,
      checkInTimestamp,
      location
    );
  }

  async simpleCheckout(
    userId: number,
    projectId: number,
    checkoutTimeStamp: Date | null
  ): Promise<time_record> {
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }

    const existingCheckIn =
      await this.timeRecordsRepository.findOpenCheckinTimeRecord(
        userId,
        projectId
      );

    if (!existingCheckIn) {
      throw new NotFoundError("open check-in");
    }

    return this.timeRecordsRepository.checkoutTimeRecord(
      existingCheckIn.time_record_id,
      checkoutTimeStamp ?? new Date()
    );
  }

  private validFileType(fileType: string) {
    if (!this.allowedMimeTypes.includes(fileType)) {
      throw new ValidationError(
        `Formato de arquivo inválido os unicos formatos aceitos são: ${this.allowedMimeTypes.join(
          ","
        )}`
      );
    }
    return true;
  }

  async detailedCheckIn(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage: string,
    fileName?: string,
    fileType?: string,
    fileContent?: Buffer,
    location?: string
  ) {
    const newRecord = await this.simpleCheckIn(
      userId,
      projectId,
      checkInTimestamp,
      location
    );

    if (!fileType || this.validFileType(fileType)) {
      await this.justificationRepository.createJustification(
        newRecord.time_record_id,
        projectId,
        userId,
        userMessage,
        JustificationType.CHECKIN,
        fileName,
        fileContent
      );

      return newRecord;
    }
  }

  async detailedCheckOut(
    userId: number,
    projectId: number,
    checkoutTimeStamp: Date | null,
    userMessage: string,
    fileName?: string,
    fileType?: string,
    fileContent?: Buffer
  ) {
    const updatedRecord = await this.simpleCheckout(
      userId,
      projectId,
      checkoutTimeStamp
    );

    if (!fileType || this.validFileType(fileType)) {
      await this.justificationRepository.createJustification(
        updatedRecord.time_record_id,
        projectId,
        userId,
        userMessage,
        JustificationType.CHECKOUT,
        fileName,
        fileContent
      );
    }

    return updatedRecord;
  }

  async getTimeRecordInfo(timeRecordId: number) {
    const timeRecord =
      await this.timeRecordsRepository.findTimeRecordInfo(timeRecordId);

    if (!timeRecord) {
      throw new NotFoundError("time-record");
    }

    return timeRecord;
  }
}
