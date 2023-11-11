import BaseRepository from "./abstract/BaseRepository";
import { JustificationType, JustificationReviewStatus } from "@prisma/client";

export default class JustificationRepository extends BaseRepository {
  async createJustification(
    projectId: number,
    userId: number,
    timeRecordId: number,
    userMessage: string,
    documentFile: Buffer,
    fileName: string,
    justificationType: JustificationType,
    updatedTimeStamp: Date,
    updatedLocation?: string
  ) {
    return this.client.time_record_justification.create({
      data: {
        user_message: userMessage,
        justification_type: justificationType,
        timestamp: updatedTimeStamp,
        updated_location: updatedLocation,
        status: JustificationReviewStatus.PENDING,
        time_record: {
          connect: {
            time_record_id: timeRecordId,
          },
        },
        project: {
          connect: {
            project_id: projectId,
          },
        },
        colaborator: {
          connect: {
            user_id: userId,
          },
        },
        justification_document: {
          create: {
            document_file: documentFile,
            file_name: fileName,
          },
        },
      },
    });
  }
  // TODO FINISH LISTING JUSTIFICATIONS
  async findJustificationsByProjectId(
    projectId: number,
    status: string[] = [...Object.values(JustificationReviewStatus)]
  ) {
    return this.client.time_record_justification.findMany({
      include: {
        colaborator: {
          select: {
            user_id: true,
            email: true,
            full_name: true,
            user_project_roles: {
              select: {
                hours_per_week: true,
                role: true,
              },
              where: {
                project_id: projectId,
              },
            },
          },
        },
      },
      where: {
        project_id: projectId,
        status: {
          in: status as JustificationReviewStatus[],
        },
      },
    });
  }

  async findJustificationById(justificationId: number) {
    return this.client.time_record_justification.findUnique({
      include: {
        colaborator: {
          select: {
            user_id: true,
            email: true,
            full_name: true,
            user_project_roles: {
              select: {
                hours_per_week: true,
                role: true,
              },
            },
          },
        },
        project: {
          select: {
            project_id: true,
          },
        },
        reviewer: {
          select: {
            user_id: true,
            email: true,
            full_name: true,
            user_project_roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
      where: {
        justification_id: justificationId,
      },
    });
  }

  async reviewJustification(
    justificationId: number,
    reviewerId: number,
    status: JustificationReviewStatus,
    manager_message: string
  ) {
    return this.client.time_record_justification.update({
      where: {
        justification_id: justificationId,
      },
      data: {
        reviewer: {
          connect: {
            user_id: reviewerId,
          },
        },
        status,
        manager_message,
        updated_at: new Date(),
      },
    });
  }

  async findJustificationDocument(justificationId: number) {
    return this.client.justification_document.findUnique({
      where: { justification_id: justificationId}
    })
  }
}
