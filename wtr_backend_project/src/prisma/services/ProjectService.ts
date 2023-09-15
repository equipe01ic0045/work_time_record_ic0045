import { PrismaClient, UserRole, project, user } from "@prisma/client";

class ProjectService {
  private prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async createProject(projectName: string, userId: number) {
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
        hours_per_week: 40,
      },
    });

    return newProject;
  }

  async addUserToProject(
    projectId: number,
    adminUserId: number,
    contributorId: number,
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
        user_id: contributorId,
        project_id: projectId,
        role: contributorRole,
        hours_per_week: contributorHoursPerWeek,
      },
    });

    return newContributorUserRole;
  }

  async updateProjectUserRole(
    projectId: number,
    adminUserId: number,
    contributorUserId: number,
    newContributorRole: UserRole,
    newHoursPerWeek: number
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
        "Usuário não têm permissão para alterar as configuracoes de outro contribuidor neste projeto."
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
        hours_per_week: newHoursPerWeek,
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

  async getProjectUsers(userId: number, projectId: number) {
    const userRole = await this.prisma.user_project_role.findUnique({
      where: {
        user_id_project_id: {
          user_id: userId,
          project_id: projectId,
        },
      },
    });

    if (!userRole) {
      throw new Error("Usuário não têm permissão nesse projeto.");
    }

    const projectUsers = await this.prisma.user_project_role.findMany({
      where: {
        project_id: projectId,
      },
      select: {
        user: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
        role: true,
        hours_per_week: true,
      },
    });

    return projectUsers;
  }
}

export default ProjectService;
