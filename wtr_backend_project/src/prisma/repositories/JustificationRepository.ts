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

  
  private justificationOutData = {
    time_record:{
      select:{
        check_in_timestamp: true,
        check_out_timestamp: true
      }
    },
    justification_document:{
      select:{
        justification_id: true
      }
    },
    user: {
      select: {
        user_id: true,
        email: true,
        full_name: true,
        cpf: true
      },
    },
    reviewer:{
      select: {
        email: true,
        full_name: true,
        cpf: true
      },
    }
  }

  async findJustificationsByProjectId(
    project_id: number,
    status: string[] = [...Object.values(JustificationReviewStatus)],
    user_id: number | undefined = undefined
  ) {
    return this.client.time_record_justification.findMany({
      include: this.justificationOutData,
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
      include: this.justificationOutData,
      where: {
        justification_id,
      },
    });
  }

  async findJustificationByTimeRecordIdAndType(
    time_record_id: number,
    justification_type: JustificationType
  ) {
    return this.client.time_record_justification.findUnique({
      where: {
        time_record_id_justification_type: {
          time_record_id,
          justification_type,
        },
      },
    });
  }

  async updateJustification(
    justification_id: number,
    user_message?: string,
    reviewer_message?: string,
    status?: JustificationReviewStatus,
    file_name?: string,
    document_file?: Buffer
  ) {
    return this.client.time_record_justification.update({
      where: {
        justification_id,
      },
      data: {
        user_message,
        reviewer_message,
        status,
        updated_at: new Date(),
        justification_document:{
          update:{
            file_name,
            document_file
          }
        }
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
