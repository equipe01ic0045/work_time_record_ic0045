import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import { time_record } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../types/errors";

export default class TimeRecordService {
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly projectsRepository: ProjectRepository;

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.projectsRepository = new ProjectRepository();
  }

  async checkInTimeRecord(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage?: string,
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
    return this.timeRecordsRepository.createTimeRecord(
      userId,
      projectId,
      checkInTimestamp,
      userMessage,
      location
    );
  }

  async checkOutTimeRecord(
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
      existingCheckIn.id,
      checkoutTimeStamp ?? new Date()
    );
  }
}
