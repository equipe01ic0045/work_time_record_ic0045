import { UserRole, project, user_project_role } from "@prisma/client";
import BaseRepository from "./abstract/BaseRepository";

export default class ProjectRepository extends BaseRepository {
  
  async findProjectByProjectName(projectName: string) {
    return this.client.project.findFirst({
      where: { project_name: projectName },
    });
  }

  async createProject(
    userId: number,
    projectName: string,
    locationRequired: boolean,
    commercialTimeRequired: boolean,
    timezone: string,
    location?: string,
    commercialTimeStart?: number,
    commercialTimeEnd?: number
  ): Promise<project> {
    const newProject = await this.client.project.create({
      data: {
        project_name: projectName,
        location_required: locationRequired,
        commercial_time_required: commercialTimeRequired,
        location: location,
        timezone: timezone,
        commercial_time_start: commercialTimeStart,
        commercial_time_end: commercialTimeEnd,
      },
    });

    await this.client.user_project_role.create({
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

  async updateUserProjectRole(
    contributorId: number,
    projectId: number,
    newContributorRole: UserRole,
    newHoursPerWeek: number
  ): Promise<user_project_role> {
    return this.client.user_project_role.update({
      where: {
        user_id_project_id: {
          user_id: contributorId,
          project_id: projectId,
        },
      },
      data: {
        user_id: contributorId,
        project_id: projectId,
        role: newContributorRole,
        hours_per_week: newHoursPerWeek,
      },
    });
  }

  async findProjectsByUserId(userId: number) {
    return this.client.user_project_role.findMany({
      where: {
        user_id: userId,
      },
      select: {
        project: true,
      },
    });
  }

  async findUsersByProjectId(projectId: number) {
    return this.client.user_project_role.findMany({
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
  }

  async addUserToProject(
    userId: number,
    projectId: number,
    hoursPerWeek: number,
    userRole: UserRole
  ): Promise<user_project_role> {
    return this.client.user_project_role.create({
      data: {
        user_id: userId,
        hours_per_week: hoursPerWeek,
        role: userRole,
        project_id: projectId,
      },
    });
  }

  async findUserProjectRole(
    userId: number,
    projectId: number,
    userRoles: UserRole[] = ["USER", "MANAGER", "ADMIN"]
  ): Promise<user_project_role | null> {
    return this.client.user_project_role.findUnique({
      where: {
        user_id_project_id: {
          project_id: projectId,
          user_id: userId,
        },
        role: {
          in: userRoles,
        },
      },
    });
  }
}
