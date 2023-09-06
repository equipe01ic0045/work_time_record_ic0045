import { PrismaClient, UserRole } from "@prisma/client";

class ProjectService {
  private prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
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
        "Usuário não têm permissão para adicionar outro contribuidor neste projeto."
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

  async changeUserRole(
    projectId: number,
    adminUserId: number,
    contributorUserId: number,
    newContributorRole: UserRole
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
        "Usuário não têm permissão para alterar os privilegios de outro contribuidor neste projeto."
      );
    }

    const newContributorUserRole = await this.prisma.user_project_role.update({
      where: {
        user_id_project_id: {
          user_id: contributorUserId,
          project_id: projectId,
        },
      },
      data: {
        role: newContributorRole,
      },
    });

    return newContributorUserRole;
  }

  async getUserProjects(userId: number) {
    // Find all user_project_role records for the user
    const userRoles = await this.prisma.user_project_role.findMany({
      where: {
        user_id: userId,
      },
    });

    // Extract project_ids from the user_project_role records
    const projectIds = userRoles.map((role) => role.project_id);

    // Find projects using the extracted project_ids
    const projects = await this.prisma.project.findMany({
      where: {
        project_id: {
          in: projectIds,
        },
      },
    });

    return projects;
  }

  // Other project-related methods
}

export default ProjectService;
