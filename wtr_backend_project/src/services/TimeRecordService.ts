import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import { JustificationType, TimeRecordJustificationStatus, time_record } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../types/errors";

export default class TimeRecordService {
  private readonly timeRecordsRepository: TimeRecordsRepository;
  private readonly projectsRepository: ProjectRepository;
  private readonly allowedMimeTypes: Array<string>;

  constructor() {
    this.timeRecordsRepository = new TimeRecordsRepository();
    this.projectsRepository = new ProjectRepository();
    this.allowedMimeTypes =  ["application/pdf"];
  }

  private isValidJustificationStatus(
    status?: string[]
  ) {

    if(!status?.length) { return true; }

    return status?.every((status: string) => Object
      .keys(TimeRecordJustificationStatus)
      .includes(status)
    );
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
  async createTimeRecordJustification(
    projectId: number,
    timeRecordId: number,
    userId: number,
    userMessage: string,
    fileName: string,
    fileType: string,
    fileSize: number, // TODO: definir valor máximo do arquivo
    documentFile: Buffer,
    justificationType: JustificationType,
    updatedTimeStamp: Date,
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
      const createdTimeRecordJustificationRequest = await this.timeRecordsRepository.createTimeRecordJustification(
        projectId,
        userId,
        timeRecordId,
        userMessage,
        documentFile,
        fileName,
        justificationType,
        updatedTimeStamp,      
        updatedLocation,
      );
      
      return createdTimeRecordJustificationRequest;

    } catch (err) {
      throw err;
    }
  }
  
  async getProjectTimeRecordsJustifications (
    managerId: number,
    projectId: number,
    status?: string[],
  ) {
    if (!this.isValidJustificationStatus(status)) {
      throw new ValidationError("status no formato inválido");
    }
    const foundManagerUserProjectRole = await this.projectsRepository.findUserProjectRole(managerId, projectId, ["ADMIN", "MANAGER"]);
    if (!foundManagerUserProjectRole) {
      throw new AuthorizationError();
    }

    const foundTimeRecordJustificationRequests = await this.timeRecordsRepository
      .findTimeRecordJustificationsByProjectId(projectId, status)
    return foundTimeRecordJustificationRequests;
  }

  async getProjectTimeRecordJustification (
    userId: number,
    timeRecordId: number,
    projectId: number,
  ) {
    const foundManagerProjectRole = await this.projectsRepository.findUserProjectRole(
      userId,
      projectId,  
      ["MANAGER", "ADMIN"]
    );
    
    const foundtimeRecordJustification = await this.timeRecordsRepository
      .findTimeRecordJustificationsById(timeRecordId);
    
    
    if (!foundManagerProjectRole) {
      throw new AuthorizationError();
    }
    if (!foundtimeRecordJustification) {
      throw new NotFoundError("Justificativa não encontrada");
    }
    return foundtimeRecordJustification;
  }

  async assessProjectTimeRecordJustification(
    projectId: number,
    approverId: number,
    timeRecordJustificationId: number,
    status: TimeRecordJustificationStatus,
  ){
    const foundUserProjectRole = await this.projectsRepository.findUserProjectRole(approverId, projectId, ["MANAGER", "ADMIN"]);
    
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const foundtimeRecordJustification = await this.timeRecordsRepository.findTimeRecordJustificationsById(timeRecordJustificationId);
    
    if (!foundtimeRecordJustification) {
      throw new NotFoundError("Jusitificativa não encontrada com esse id");
    }

    const updatedTimeJustification =  await this.timeRecordsRepository.assessTimeRecordJustiticationById(
      timeRecordJustificationId,
      approverId,
      status,
    );
    
    return updatedTimeJustification;
  }
}
