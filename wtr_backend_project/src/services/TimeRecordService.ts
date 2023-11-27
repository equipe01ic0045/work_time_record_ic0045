import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import JustificationRepository from "../prisma/repositories/JustificationRepository";
import {
  JustificationReviewStatus,
  JustificationType,
  time_record,
} from "@prisma/client";
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

  async getUserTimeRecordsInProject(
    userId: number,
    projectId: number,
    from?: Date,
    to?: Date
  ) {
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }

    return this.timeRecordsRepository.getUserTimeRecordsInProject(
      userId,
      projectId,
      from,
      to
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
        checkInTimestamp,
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
        checkoutTimeStamp ?? new Date(),
        fileName,
        fileContent
      );
    }

    return updatedRecord;
  }

  async getTimeRecordInfo(timeRecordId: number) {
    const timeRecord = await this.timeRecordsRepository.findTimeRecordInfo(
      timeRecordId
    );

    if (!timeRecord) {
      throw new NotFoundError("time-record");
    }

    return timeRecord;
  }

  async updateTimeRecordInfo(
    time_record_id: number,
    check_in_timestamp?: string,
    check_out_timestamp?: string,
    user_message?: string,
    reviewer_message?: string,
    status?: JustificationReviewStatus,
    file_name?: string,
    file_type?: string,
    file_content?: Buffer
  ) {
    const timeRecord = await this.timeRecordsRepository.findTimeRecordById(
      time_record_id
    );
    if (!timeRecord) {
      throw new NotFoundError("time_record");
    }

    if (check_in_timestamp && check_out_timestamp) {
      throw new AuthorizationError();
    }

    const justification_type = check_in_timestamp
      ? JustificationType.CHECKIN
      : JustificationType.CHECKOUT;

    const existing_justification =
      await this.justificationRepository.findJustificationByTimeRecordIdAndType(
        time_record_id,
        justification_type
      );

    let checkInTimestamp: Date | undefined = check_in_timestamp
      ? new Date(check_in_timestamp)
      : undefined;
    let checkOutTimestamp: Date | undefined = check_out_timestamp
      ? new Date(check_out_timestamp)
      : undefined;

    await this.timeRecordsRepository.updateTimeRecord(
      time_record_id,
      checkInTimestamp,
      checkOutTimestamp
    );

    if (existing_justification) {
      if (!file_type || this.validFileType(file_type)) {
        await this.justificationRepository.updateJustification(
          existing_justification.justification_id,
          user_message,
          reviewer_message,
          status,
          file_name,
          file_content
        );
      }
    } else if (
      !existing_justification &&
      (user_message ||
        reviewer_message ||
        status ||
        file_name ||
        file_type ||
        file_content)
    ) {
      throw new NotFoundError("justification");
    }
  }

  async updateTimeRecordInfoManager(
    time_record_id: number,
    check_in_timestamp?: string,
    check_out_timestamp?: string,
    user_message?: string,
    reviewer_message?: string,
    status?: JustificationReviewStatus,
    file_name?: string,
    file_type?: string,
    file_content?: Buffer
  ) {
    const timeRecord = await this.timeRecordsRepository.findTimeRecordById(
      time_record_id
    );
    if (!timeRecord) {
      throw new NotFoundError("time_record");
    }

    if (check_in_timestamp && check_out_timestamp) {
      throw new AuthorizationError();
    }

    const justification_type = check_in_timestamp
      ? JustificationType.CHECKIN
      : JustificationType.CHECKOUT;

    const existing_justification =
      await this.justificationRepository.findJustificationByTimeRecordIdAndType(
        time_record_id,
        justification_type
      );

    let checkInTimestamp: Date | undefined = check_in_timestamp
      ? new Date(check_in_timestamp)
      : undefined;
    let checkOutTimestamp: Date | undefined = check_out_timestamp
      ? new Date(check_out_timestamp)
      : undefined;

    await this.timeRecordsRepository.updateTimeRecord(
      time_record_id,
      checkInTimestamp,
      checkOutTimestamp
    );

    if (existing_justification) {
      if (!file_type || this.validFileType(file_type)) {
        await this.justificationRepository.updateJustification(
          existing_justification.justification_id,
          user_message,
          reviewer_message,
          status,
          file_name,
          file_content
        );
      }
    } else if (
      !existing_justification &&
      (user_message ||
        reviewer_message ||
        status ||
        file_name ||
        file_type ||
        file_content)
    ) {
      throw new NotFoundError("justification");
    }
  }

  async getUserProjectTimeRecords(userId: number) {
    const timeRecords =
      await this.timeRecordsRepository.findUserProjectTimeRecords(userId);
    return timeRecords;
  }
}
