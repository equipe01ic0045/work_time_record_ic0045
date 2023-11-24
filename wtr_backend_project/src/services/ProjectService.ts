import ProjectRepository from "../prisma/repositories/ProjectRepository";
import UserRepository from "../prisma/repositories/UserRepository";
import { UserRole, project, user_project_role } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../types/errors";
import TimeRecordsRepository from "../prisma/repositories/TimeRecordsRepository";

export default class ProjectService {
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository;
  private timeRecordRepository: TimeRecordsRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.userRepository = new UserRepository();
    this.timeRecordRepository = new TimeRecordsRepository();
  }

  async createProject(
    userId: number,
    projectName: string,
    projectDescription: string,
    locationRequired: boolean,
    commercialTimeRequired: boolean,
    timezone: string,
    location?: string,
    commercialTimeStart?: number,
    commercialTimeEnd?: number
  ): Promise<project> {
    const foundProject = await this.projectRepository.findProjectByProjectName(
      projectName
    );

    if (!foundProject) {
      const newProject = await this.projectRepository.createProject(
        userId,
        projectName,
        projectDescription,
        locationRequired,
        commercialTimeRequired,
        timezone,
        location,
        commercialTimeStart,
        commercialTimeEnd
      );
      return newProject;
    } else {
      throw new ConflictError("project");
    }
  }

  async updateProject(
    projectId: number,
    projectName: string,
    projectDescription: string,
    locationRequired: boolean,
    commercialTimeRequired: boolean,
    timezone: string,
    location?: string,
    commercialTimeStart?: number,
    commercialTimeEnd?: number
  ): Promise<project> {
    const newProject = await this.projectRepository.updateProject(
      projectId,
      projectName,
      projectDescription,
      locationRequired,
      commercialTimeRequired,
      timezone,
      location,
      commercialTimeStart,
      commercialTimeEnd
    );
    return newProject;
  }

  async deleteProject(projectId: number) {
    await this.projectRepository.deleteProject(projectId);
  }

  async addUserToProject(
    adminUserId: number,
    projectId: number,
    contributorEmail: string,
    contributorRole: UserRole,
    contributorHoursPerWeek: number
  ): Promise<user_project_role> {
    const foundAdminRole = await this.projectRepository.findUserProjectRole(
      adminUserId,
      projectId,
      ["MANAGER", "ADMIN"]
    );
    if (!foundAdminRole) {
      throw new AuthorizationError();
    }

    const foundUser = await this.userRepository.findUserByEmail(
      contributorEmail
    );

    if (!foundUser) {
      throw new NotFoundError("user");
    }

    try {
      return this.projectRepository.addUserToProject(
        foundUser.user_id,
        projectId,
        contributorHoursPerWeek,
        contributorRole
      );
    } catch {
      throw new ConflictError("user role in project");
    }
  }

  async updateProjectUserRole(
    adminId: number,
    projectId: number,
    contributorEmail: string,
    newContributorRole: UserRole,
    newHoursPerWeek: number
  ): Promise<user_project_role> {
    const foundAdminRole = await this.projectRepository.findUserProjectRole(
      adminId,
      projectId,
      ["ADMIN", "MANAGER"]
    );
    if (!foundAdminRole) {
      throw new AuthorizationError();
    }

    const foundUser = await this.userRepository.findUserByEmail(
      contributorEmail
    );
    if (!foundUser) {
      throw new NotFoundError("user");
    }

    return this.projectRepository.updateUserProjectRole(
      foundUser.user_id,
      projectId,
      newContributorRole,
      newHoursPerWeek
    );
  }

  async getProjectById(userId: number, projectId: number) {
    const foundRole = await this.projectRepository.findUserProjectRole(
      userId,
      projectId
    );

    if (foundRole) {
      return this.projectRepository.findProjectById(projectId);
    } else {
      throw new AuthorizationError();
    }
  }

  async getUserProjects(userId: number) {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    if (!foundUser) {
      throw new AuthorizationError();
    }

    const userProjects = await this.projectRepository.findProjectsByUserId(
      userId
    );
    return userProjects;
  }

  async getProjectUsers(userId: number, projectId: number) {
    const foundUser = await this.projectRepository.findUserProjectRole(
      userId,
      projectId
    );

    if (!!foundUser) {
      const projectUsers = await this.projectRepository.findUsersByProjectId(
        projectId
      );

      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const elapsedTimeCounts =
        await this.timeRecordRepository.getUsersElapsedTime(
          projectId,
          firstDayOfMonth,
          lastDayOfMonth
        );

      const projectUsersInfo = projectUsers.map((item1) => {
        let foundElapsedTime = elapsedTimeCounts.find(
          (item2) => item2.user_id === item1.user.user_id
        );
        if (!foundElapsedTime) {
          foundElapsedTime = {
            user_id: item1.user.user_id,
            elapsed_time_sum: 0,
          };
        }
        return {
          ...item1,
          ...foundElapsedTime,
        };
      });

      return projectUsersInfo;
    } else {
      throw new AuthorizationError();
    }
  }

  async deleteUser(admin_id: number, project_id: number, user_id: number) {
    const foundAdminUserProjectRole =
      await this.projectRepository.findUserProjectRole(admin_id, project_id, [
        "ADMIN",
        "MANAGER",
      ]);

    const userToBeDeletedRole =
      await this.projectRepository.findUserProjectRole(user_id, project_id);

    if (!foundAdminUserProjectRole || !userToBeDeletedRole) {
      throw new AuthorizationError();
    }

    const deletedUser = await this.projectRepository.deleteUserInProject(
      user_id,
      project_id
    );

    return deletedUser;
  }
}
