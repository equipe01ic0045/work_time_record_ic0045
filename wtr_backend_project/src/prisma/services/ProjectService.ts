import { UserRole, project, user_project_role } from "@prisma/client";
import AuthorizedService from "./abstract/AuthorizedService";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../../types/errors";

export default class ProjectService extends AuthorizedService {
  async createProject(projectName: string, userId: number): Promise<project> {
    // if project name is available
    if (
      !(await this.prisma.project.findUnique({
        where: { project_name: projectName },
      }))
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
          hours_per_week: 40,
        },
      });

      return newProject;
    } else {
      throw new ConflictError("project");
    }
  }

  async addUserToProject(
    projectId: number,
    adminUserId: number,
    contributorId: number,
    contributorRole: UserRole,
    contributorHoursPerWeek: number
  ): Promise<user_project_role> {
    // if user has rights to add a new user to the project
    // improve that later
    if (await this.validateUser(adminUserId, projectId, ["ADMIN", "MANAGER"])) {
      if (
        !!(await this.prisma.user.findUnique({
          where: { user_id: contributorId },
        }))
      ) {
        try {
          return await this.prisma.user_project_role.create({
            data: {
              user_id: contributorId,
              project_id: projectId,
              role: contributorRole,
              hours_per_week: contributorHoursPerWeek,
            },
          });
        } catch {
          throw new ConflictError("user role in project");
        }
      } else {
        throw new NotFoundError("user");
      }
    } else {
      throw new AuthorizationError();
    }
  }

  async updateProjectUserRole(
    projectId: number,
    adminUserId: number,
    contributorId: number,
    newContributorRole: UserRole,
    newHoursPerWeek: number
  ): Promise<user_project_role> {
    // if user has manager privileges
    // improve that later
    if (await this.validateUser(adminUserId, projectId, ["ADMIN", "MANAGER"])) {
      if (
        !!(await this.prisma.user.findUnique({
          where: { user_id: contributorId },
        }))
      ) {
        return await this.prisma.user_project_role.update({
          where: {
            user_id_project_id: {
              user_id: contributorId,
              project_id: projectId,
            },
          },
          data: {
            role: newContributorRole,
            hours_per_week: newHoursPerWeek,
          },
        });
      } else {
        throw new NotFoundError("user");
      }
    } else {
      throw new AuthorizationError();
    }
  }

  async getUserProjects(userId: number): Promise<project[]> {
    if (await this.prisma.user.findUnique({ where: { user_id: userId } })) {
      // get user user_project_roles records
      const userProjects = await this.prisma.user_project_role.findMany({
        where: {
          user_id: userId,
        },
        select: {
          project: true,
        },
      });

      // Extract projects from the user_project_role records
      return userProjects.map((userRole) => userRole.project);
    } else {
      throw new AuthorizationError();
    }
  }

  async getProjectUsers(userId: number, projectId: number): Promise<any> {
    if (await this.validateUser(userId, projectId)) {
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
    } else {
      throw new AuthorizationError();
    }
  }
}
