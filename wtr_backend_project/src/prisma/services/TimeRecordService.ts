import { PrismaClient } from "@prisma/client";

class TimeRecordService {
  private prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async checkInTimeRecord(
    userId: number,
    projectId: number,
    userMessage: string | null,
    location: string | null
  ) {
    // Check if the user is in the project
    const userProjectRole = await this.prisma.user_project_role.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
      },
    });

    if (!userProjectRole) {
      throw new Error("Usuario não reconhecido nesse projeto.");
    }

    // Check if there is an open check-in record for the user and project
    const existingCheckIn = await this.prisma.time_record.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
        check_out_timestamp: null, // Check if the check-out timestamp is null (i.e., open record)
      },
    });

    if (existingCheckIn) {
      throw new Error("Usuario já têm um check-in aberto para esse projeto.");
    }

    // Create a new check-in record
    return this.prisma.time_record.create({
      data: {
        user_id: userId,
        project_id: projectId,
        user_message: userMessage,
        location: location,
      },
    });
  }

  async checkOutTimeRecord(userId: number, projectId: number) {
    // Check if the record is open
    const existingCheckIn = await this.prisma.time_record.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
        check_out_timestamp: null,
      },
    });

    if (existingCheckIn) {
      return this.prisma.time_record.updateMany({
        where: {
          user_id: userId,
          project_id: projectId,
          check_out_timestamp: null,
        },
        data: {
          check_out_timestamp: new Date(),
        },
      });
    } else {
      throw new Error("Usuario não têm um check-in aberto para esse projeto.");
    }
  }
}

export default TimeRecordService;
