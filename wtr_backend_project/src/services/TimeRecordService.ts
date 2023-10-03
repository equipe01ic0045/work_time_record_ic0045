import { time_record } from "@prisma/client";
import AuthorizationError from "../types/errors/AuthorizationError";
import ConflictError from "../types/errors/ConflictError";
import NotFoundError from "../types/errors/NotFoundError";
import { TimeRecordsRepository } from "../repositories/TimeRecordsRepository";
import { CheckoutTimeRecordDTO, TimeRecordsCheckinRequestDTO } from "../types/dtos/TimeRecordsDTO";
import { ProjectRepository } from "../repositories/ProjectRepository";

export default class TimeRecordService {
 
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly projectsRepository: ProjectRepository

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.projectsRepository = new ProjectRepository();
  }

  async checkInTimeRecord({
    checkInTimestamp,
    projectId,
    userId,
    location,
    userMessage
  }: TimeRecordsCheckinRequestDTO): Promise<time_record> {
    const foundUserProjectRole = await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {  throw new AuthorizationError(); }
    const existingCheckIn = await this.timeRecordsRepository.findOpenCheckinTimeRecord(userId, projectId);
    if (existingCheckIn) { throw new ConflictError("open check-in"); }
    return this.timeRecordsRepository.createTimeRecord(
        userId, 
        projectId, 
        checkInTimestamp, 
        userMessage, 
        location
      );
  }

  async checkOutTimeRecord({
    checkOutTimestamp,
    projectId,
    userId
  }: CheckoutTimeRecordDTO): Promise<time_record> {
    const foundUserProjectRole =  await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) { throw new AuthorizationError(); }
    const existingCheckIn = await this.timeRecordsRepository
      .findOpenCheckinTimeRecord(
        userId,
        projectId,
      );
    if (!existingCheckIn) { throw new NotFoundError("open check-in"); }

    return this.timeRecordsRepository.checkoutTimeRecord(
      existingCheckIn.time_record_id,
      checkOutTimestamp ?? new Date()
    );
    
  }
}
