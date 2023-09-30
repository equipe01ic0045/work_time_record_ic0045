import { time_record } from "@prisma/client";
import AuthorizationError from "../types/errors/AuthorizationError";
import ConflictError from "../types/errors/ConflictError";
import NotFoundError from "../types/errors/NotFoundError";
import AuthorizedService from "./AbsAuthorizedService";
import { TimeRecordsRepository } from "../repositories/TimeRecordsRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CheckoutTimeRecordDTO, TimeRecordsCheckinRequestDTO } from "../types/dtos/TimeRecordsDTO";

export default class TimeRecordService extends AuthorizedService {
 
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly usersRepository: UserRepository;

  constructor() {
    super();
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.usersRepository =  new UserRepository();
  }

  async checkInTimeRecord(data: TimeRecordsCheckinRequestDTO): Promise<time_record> {
    const foundUser = await this.usersRepository.findUserByUserId(data.userId);
    if (!foundUser) {  throw new AuthorizationError(); }
    const existingCheckIn = await this.timeRecordsRepository.findOpenCheckinTimeRecord(data.userId, data.projectId);
    if (existingCheckIn) { throw new ConflictError("open check-in"); }
    return this.timeRecordsRepository
      .createTimeRecord(
        data.userId, 
        data.projectId, 
        data.checkInTimestamp, 
        data.userMessage, 
        data.location
      );
  }

  async checkOutTimeRecord(data: CheckoutTimeRecordDTO): Promise<time_record> {
    const foundUser =  await this.usersRepository.findUserByUserId(data.userId);
    if (!foundUser) { throw new AuthorizationError(); }
    const existingCheckIn = await this.timeRecordsRepository
      .findOpenCheckinTimeRecord(
        data.userId,
        data.projectId,
      );
    if (!existingCheckIn) { throw new NotFoundError("open check-in"); }

    return this.timeRecordsRepository.checkoutTimeRecord(
      existingCheckIn.time_record_id,
      data.checkOutTimestamp ?? new Date()
    );
    
  }
}
