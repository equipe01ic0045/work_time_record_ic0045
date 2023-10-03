import { time_record } from "@prisma/client";
import AuthorizationError from "../types/errors/AuthorizationError";
import ConflictError from "../types/errors/ConflictError";
import NotFoundError from "../types/errors/NotFoundError";
import { TimeRecordsRepository } from "../repositories/TimeRecordsRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CheckoutTimeRecordDTO, TimeRecordsCheckinRequestDTO } from "../types/dtos/TimeRecordsDTO";

export default class TimeRecordService {
 
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly usersRepository: UserRepository;

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.usersRepository =  new UserRepository();
  }

  async checkInTimeRecord({
    checkInTimestamp,
    projectId,
    userId,
    location,
    userMessage
  }: TimeRecordsCheckinRequestDTO): Promise<time_record> {
    const foundUser = await this.usersRepository.findUserByUserId(userId);
    if (!foundUser) {  throw new AuthorizationError(); }
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
    const foundUser =  await this.usersRepository.findUserByUserId(userId);
    if (!foundUser) { throw new AuthorizationError(); }
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
