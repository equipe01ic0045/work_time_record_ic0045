import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import JustificationRepository from "../prisma/repositories/JustificationRepository";
import { JustificationType, JustificationReviewStatus } from "@prisma/client";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "../types/errors";

export default class JustificationService {
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

  private isValidJustificationStatus(status?: string[]) {
    if (!status?.length) {
      return true;
    }

    return status?.every((status: string) =>
      Object.keys(JustificationReviewStatus).includes(status)
    );
  }

  // TODO: Adiciona serviço de notifcação por email
  async createJustification(
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
    updatedLocation?: string
  ) {
    if (!this.allowedMimeTypes.includes(fileType)) {
      throw new ValidationError(
        `Formato de arquivo inválido os unicos formatos aceitos são: ${this.allowedMimeTypes.join(
          ","
        )}`
      );
    }

    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const foundTimeRecord = await this.timeRecordsRepository.findTimeRecordById(
      timeRecordId
    );

    if (!foundTimeRecord) {
      throw new NotFoundError("time record");
    }

    try {
      const createdTimeRecordJustificationRequest =
        await this.justificationRepository.createJustification(
          projectId,
          userId,
          timeRecordId,
          userMessage,
          documentFile,
          fileName,
          justificationType,
          updatedTimeStamp,
          updatedLocation
        );

      return createdTimeRecordJustificationRequest;
    } catch (err) {
      throw err;
    }
  }

  async getProjectJustifications(
    managerId: number,
    projectId: number,
    status?: string[]
  ) {
    if (!this.isValidJustificationStatus(status)) {
      throw new ValidationError("status no formato inválido");
    }
    const foundManagerUserProjectRole =
      await this.projectsRepository.findUserProjectRole(managerId, projectId, [
        "ADMIN",
        "MANAGER",
      ]);
    if (!foundManagerUserProjectRole) {
      throw new AuthorizationError();
    }

    const foundTimeRecordJustificationRequests =
      await this.justificationRepository.findJustificationsByProjectId(
        projectId,
        status
      );
    return foundTimeRecordJustificationRequests;
  }

  async getProjectJustification(
    userId: number,
    projectId: number,
    justificationId: number
  ) {
    const foundtimeRecordJustification =
      await this.justificationRepository.findJustificationById(justificationId);

    if (!foundtimeRecordJustification) {
      throw new NotFoundError("Justificativa não encontrada");
    }

    if (foundtimeRecordJustification.colaborator_id !== userId) {
      const foundManagerProjectRole =
        await this.projectsRepository.findUserProjectRole(userId, projectId, [
          "MANAGER",
          "ADMIN",
        ]);

      if (!foundManagerProjectRole) {
        throw new AuthorizationError();
      }
    }

    return foundtimeRecordJustification;
  }

  async reviewJustification(
    projectId: number,
    reviewerId: number,
    justificationId: number,
    status: JustificationReviewStatus,
    managerMessage: string
  ) {
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(reviewerId, projectId, [
        "MANAGER",
        "ADMIN",
      ]);

    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }
    const foundtimeRecordJustification =
      await this.justificationRepository.findJustificationById(justificationId);

    if (!foundtimeRecordJustification) {
      throw new NotFoundError("Jusitificativa não encontrada com esse id");
    }

    const updatedTimeJustification =
      await this.justificationRepository.reviewJustification(
        justificationId,
        reviewerId,
        status,
        managerMessage
      );

    return updatedTimeJustification;
  }
}
