import { PrismaClient, UserRole } from "@prisma/client";

export default class PrismaService {
  prisma: PrismaClient = new PrismaClient();

  async createUser(username: string, password: string, email: string) {
    return this.prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
  }

  async createProject(
    projectName: string,
    userId: number,
    hoursPerWeek: number = 40
  ) {
    const newProject = await this.prisma.project.create({
      data: {
        project_name: projectName,
      },
    });

    await this.prisma.user_project_role.create({
      data: {
        user: {
          connect: {
            user_id: userId,
          },
        },
        project: {
          connect: {
            project_id: newProject.project_id,
          },
        },
        role: "ADMIN",
        hours_per_week: hoursPerWeek,
      },
    });

    return newProject;
  }

  async addUserToProject(
    projectId: number,
    adminUserId: number,
    contributorUserId: number,
    contributorRole: UserRole,
    contributorHoursPerWeek: number
  ) {
    // Check if the admin user is an admin or manager
    const adminUserRole = await this.prisma.user_project_role.findFirst({
      where: {
        user_id: adminUserId,
        project_id: projectId,
        role: {
          in: ["ADMIN", "MANAGER"],
        },
      },
    });

    // throw error if user does not have to rights to add a new user to the project
    if (!adminUserRole) {
      throw new Error(
        "Usuário não têm permissão para adicionar outro contribuidor para este projeto."
      );
    }

    // Create a new user_project_role record for the contributor
    const newContributorUserRole = await this.prisma.user_project_role.create({
      data: {
        user_id: contributorUserId,
        project_id: projectId,
        role: contributorRole,
        hours_per_week: contributorHoursPerWeek,
      },
    });

    return newContributorUserRole;
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
        role: { in: ["MANAGER", "USER"] }, // Admin does not check in or out records
      },
    });

    if (!userProjectRole) {
      throw new Error("User is not authorized for this project.");
    }

    // create checkin record
    return this.prisma.time_record.create({
      data: {
        user_id: userId,
        project_id: projectId,
        user_message: userMessage,
        location: location,
      },
    });
  }

  async checkOutTimeRecord(timeRecordId: number) {
    return this.prisma.time_record.update({
      where: {
        time_record_id: timeRecordId,
      },
      data: {
        check_out_timestamp: new Date(),
      },
    });
  }
}
