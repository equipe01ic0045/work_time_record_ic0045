import { TimeRecordJustificationStatus } from "@prisma/client";
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
        id: timeRecordId,
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
        id: timeRecordId
      }
    })
  }

  
  
  async createCheckinJustification(
    projectId: number,
    userId: number,
    timeRecordId: number,
    userMessage: string,
    documentFile: Buffer,
    fileName: string,
    updatedCheckinTimestamp: Date,
    updatedLocation?: string,
  ) {
    return this.client.time_record_justification.create({
      data: {
        user_message: userMessage,
        updated_check_in_timestamp: updatedCheckinTimestamp,
        updated_location: updatedLocation,
        status: TimeRecordJustificationStatus.PENDING,
        time_record: {
          connect: {
            id: timeRecordId
          },
        },
        project: {
          connect: {
            id: projectId,
          }
        },
        colaborator: {
          connect: {
            id: userId
          }
        },
        absense_documents: {
          create: {
            document_file: documentFile,
            file_name: fileName,
          }
        }    
      }
    })
  }
  
  async createCheckoutJustification(
    projectId: number,
    userId: number,
    timeRecordId: number,
    userMessage: string,
    documentFile: Buffer,
    fileName: string,
    updatedCheckoutTimestamp: Date,
    updatedLocation?: string,
  ) {
    return this.client.time_record_justification.create({
      data: {
        user_message: userMessage,
        updated_check_out_timestamp: updatedCheckoutTimestamp,
        updated_location: updatedLocation,
        status: TimeRecordJustificationStatus.PENDING,
        time_record: {
          connect: {
            id: timeRecordId
          },
        },
        project: {
          connect: {
            id: projectId,
          }
        },
        colaborator: {
          connect: {
            id: userId
          }
        },
        absense_documents: {
          create: {
            document_file: documentFile,
            file_name: fileName,
          }
        }    
      }
    })
  }
  // TODO FINISH LISTING JUSTIFICATIONS
  async findTimeRecordJustificationsByProjectId(projectId: number, status: TimeRecordJustificationStatus = TimeRecordJustificationStatus.PENDING) {
    return this.client.time_record_justification.findMany({
        include: {
          colaborator: {
            select: {
              id: true,
              email: true,
              full_name: true,
              user_project_roles: {
                select: {
                  hours_per_week: true,
                  role: true,
                },
                where: {
                  project_id: projectId,
                }
              }
            }
          }
        }  
      }
    )
  }
}
