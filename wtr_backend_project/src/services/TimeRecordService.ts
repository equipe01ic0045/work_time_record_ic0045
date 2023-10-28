import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import { time_record } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../types/errors";

export default class TimeRecordService {
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly projectsRepository: ProjectRepository;
  private readonly allowedMimeTypes: Array<String>;

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.projectsRepository = new ProjectRepository();
    this.allowedMimeTypes =  ["application/pdf"];
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

    const foundUserProjectRole = await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const existingCheckIn = await this.timeRecordsRepository.findOpenCheckinTimeRecord(
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
  // TODO: Adiciona serviço de notifcação por email
  async checkoutJustificationRequest(
    projectId: number,
    timeRecordId: number,
    userId: number,
    userMessage: string,
    fileName: string,
    fileType: string,
    fileSize: number, // TODO: definir valor máximo do arquivo
    documentFile: Buffer,
    updatedCheckOutTimestamp: Date,
    updatedLocation?: string,
  ) {

    
    if (!this.allowedMimeTypes.includes(fileType)) {
      throw new ValidationError(`Formato de arquivo inválido os unicos formatos aceitos são: ${this.allowedMimeTypes.join(",")}` )
    }

    const foundUserProjectRole = await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const foundTimeRecord = await this.timeRecordsRepository.findTimeRecordById(timeRecordId);
    
    if (!foundTimeRecord) {
      throw new NotFoundError("time record");
    }

    try {
      const createdTimeRecordJustificationRequest =  await this.timeRecordsRepository.createCheckoutJustification(
        projectId,
        userId,
        timeRecordId,
        userMessage,
        documentFile,
        fileName,
        updatedCheckOutTimestamp,      
        updatedLocation,
      );
      
      return createdTimeRecordJustificationRequest;

    } catch (err) {
      throw err;
    }
  }
  async checkinJustificationRequest(
    projectId: number,
    timeRecordId: number,
    userId: number,
    userMessage: string,
    fileName: string,
    fileType: string,
    fileSize: number, // TODO: definir valor máximo do arquivo
    documentFile: Buffer,
    updatedCheckInTimestamp: Date,
    updatedLocation?: string,
  ) {

    
    if (!this.allowedMimeTypes.includes(fileType)) {
      throw new ValidationError(`Formato de arquivo inválido os unicos formatos aceitos são: ${this.allowedMimeTypes.join(",")}` )
    }

    const foundUserProjectRole = await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const foundTimeRecord = await this.timeRecordsRepository.findTimeRecordById(timeRecordId);
    
    if (!foundTimeRecord) {
      throw new NotFoundError("time record");
    }

    try {
      const createdTimeRecordJustificationRequest =  await this.timeRecordsRepository.createCheckinJustification(
        projectId,
        userId,
        timeRecordId,
        userMessage,
        documentFile,
        fileName,
        updatedCheckInTimestamp,      
        updatedLocation,
      );
      
      return createdTimeRecordJustificationRequest;

    } catch (err) {
      throw err;
    }
  }

  async approveTimeRecordJustification (

  ) {

  }
}
