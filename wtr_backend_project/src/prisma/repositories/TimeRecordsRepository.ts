import {
  JustificationType,
  TimeRecordJustificationStatus,
} from "@prisma/client";
import BaseRepository from "./abstract/BaseRepository";

export default class TimeRecordsRepository extends BaseRepository {
  async findOpenCheckinTimeRecord(userId: number, projectId: number) {
    return this.client.time_record.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
        check_out_timestamp: null,
      },
    });
  }

  async createTimeRecord(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage?: string,
    location?: string
  ) {
    return this.client.time_record.create({
      data: {
        user_id: userId,
        project_id: projectId,
        check_in_timestamp: checkInTimestamp,
        location: location,
      },
    });
  }

  async checkoutTimeRecord(timeRecordId: number, checkoutTimeStamp: Date) {
    return this.client.time_record.update({
      where: {
        time_record_id: timeRecordId,
        check_out_timestamp: null,
      },
      data: {
        check_out_timestamp: checkoutTimeStamp,
      },
    });
  }

  async findTimeRecordById(timeRecordId: number) {
    return this.client.time_record.findUnique({
      where: {
        time_record_id: timeRecordId,
      },
    });
  }

  async createTimeRecordJustification(
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
        status: TimeRecordJustificationStatus.PENDING,
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
        absense_document: {
          create: {
            document_file: documentFile,
            file_name: fileName,
          },
        },
      },
    });
  }
  // TODO FINISH LISTING JUSTIFICATIONS
  async findTimeRecordJustificationsByProjectId(
    projectId: number,
    status: string[] = [...Object.values(TimeRecordJustificationStatus)]
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
          in: status as TimeRecordJustificationStatus[],
        },
      },
    });
  }

  async findTimeRecordJustificationsById(justificationId: number) {
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

  async assessTimeRecordJustiticationById(
    justificationId: number,
    reviewerId: number,
    status: TimeRecordJustificationStatus,
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
}
