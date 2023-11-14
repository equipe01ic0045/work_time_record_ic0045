import BaseRepository from "./abstract/BaseRepository";
import { JustificationType, JustificationReviewStatus } from "@prisma/client";

export default class JustificationRepository extends BaseRepository {
  async createJustification(
    time_record_id: number,
    project_id: number,
    user_id: number,
    user_message: string,
    justification_type: JustificationType,
    file_name?: string,
    document_file?: Buffer
  ) {
    const justificationData: any = {
      user_message,
      justification_type,
      status: JustificationReviewStatus.PENDING,
      time_record: {
        connect: {
          time_record_id,
        },
      },
      user: {
        connect: {
          user_id,
        },
      },
      project: {
        connect: {
          project_id,
        },
      },
    };

    if (file_name && document_file) {
      justificationData.justification_document = {
        create: {
          document_file,
          file_name,
        },
      };
    }

    return this.client.time_record_justification.create({
      data: justificationData,
    });
  }

  async findJustificationsByProjectId(
    project_id: number,
    status: string[] = [...Object.values(JustificationReviewStatus)],
    user_id: number | undefined = undefined
  ) {
    return this.client.time_record_justification.findMany({
      include: {
        user: {
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
                project_id,
              },
            },
          },
        },
      },
      where: {
        project_id,
        user_id,
        status: {
          in: status as JustificationReviewStatus[],
        },
      },
    });
  }

  async findJustificationById(justification_id: number) {
    return this.client.time_record_justification.findUnique({
      include: {
        user: {
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
        justification_id,
      },
    });
  }

  async reviewJustification(
    justification_id: number,
    reviewer_id: number,
    status: JustificationReviewStatus,
    reviewer_message: string
  ) {
    return this.client.time_record_justification.update({
      where: {
        justification_id,
      },
      data: {
        reviewer: {
          connect: {
            user_id: reviewer_id,
          },
        },
        status,
        reviewer_message,
        updated_at: new Date(),
      },
    });
  }

  async findJustificationDocument(justification_id: number) {
    return this.client.justification_document.findUnique({
      where: { justification_id },
    });
  }
}
