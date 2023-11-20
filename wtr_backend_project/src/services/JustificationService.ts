import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";
import ProjectRepository from "../prisma/repositories/ProjectRepository";
import JustificationRepository from "../prisma/repositories/JustificationRepository";
import {
  JustificationType,
  JustificationReviewStatus,
  UserRole,
} from "@prisma/client";
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
    documentFile: Buffer,
    justificationType: JustificationType,
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
          timeRecordId,
          projectId,
          userId,
          userMessage,
          justificationType,
          fileName,
          documentFile
        );

      return createdTimeRecordJustificationRequest;
    } catch (err) {
      throw err;
    }
  }

  async getProjectJustifications(
    userId: number,
    projectId: number,
    status?: string[]
  ) {
    if (!this.isValidJustificationStatus(status)) {
      throw new ValidationError("status no formato inválido");
    }
    const foundUserProjectRole =
      await this.projectsRepository.findUserProjectRole(userId, projectId);
    if (!foundUserProjectRole) {
      throw new AuthorizationError();
    }

    let justificationList;
    if (
      foundUserProjectRole.role == UserRole.ADMIN ||
      foundUserProjectRole.role == UserRole.MANAGER
    ) {
      justificationList =
        await this.justificationRepository.findJustificationsByProjectId(
          projectId,
          status
        );
    } else {
      justificationList =
        await this.justificationRepository.findJustificationsByProjectId(
          projectId,
          status,
          userId
        );
    }

    return justificationList;
  }

  async getProjectJustification(
    userId: number,
    projectId: number,
    justificationId: number
  ) {
    const foundtimeRecordJustification =
      await this.justificationRepository.findJustificationById(justificationId);

    if (!foundtimeRecordJustification) {
      throw new NotFoundError("justification");
    }

    if (foundtimeRecordJustification.user_id !== userId) {
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
    reviewerMessage: string
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
        reviewerMessage
      );

    return updatedTimeJustification;
  }

  async getJustificationDocument(
    projectId: number,
    userId: number,
    justificationId: number
  ) {
    const fileRecord =
      await this.justificationRepository.findJustificationDocument(
        justificationId
      );

    if (!fileRecord) {
      throw new NotFoundError("file");
    }

    const justificationRecord =
      await this.justificationRepository.findJustificationById(
        fileRecord.justification_id
      );

    if (!justificationRecord) {
      throw new NotFoundError("Justificativa não encontrada");
    }

    if (justificationRecord.user_id !== userId) {
      const foundManagerProjectRole =
        await this.projectsRepository.findUserProjectRole(userId, projectId, [
          "MANAGER",
          "ADMIN",
        ]);

      if (!foundManagerProjectRole) {
        throw new AuthorizationError();
      }
    }

    return fileRecord;
  }
}
