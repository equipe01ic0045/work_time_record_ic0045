import ProjectRepository from "../prisma/repositories/ProjectRepository";
import UserRepository from "../prisma/repositories/UserRepository";
import { UserRole, project, user_project_role } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../types/errors";

export default class ProjectService {
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.userRepository = new UserRepository();
  }

  async createProject(
    userId: number,
    projectName: string,
    projectDescription:string,
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

  async addUserToProject(
    adminUserId: number,
    projectId: number,
    contributorId: number,
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
    const foundUser = await this.userRepository.findUserByUserId(contributorId);
    if (!foundUser) {
      throw new NotFoundError("user");
    }
    try {
      return this.projectRepository.addUserToProject(
        contributorId,
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
    contributorId: number,
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

    const foundUser = await this.userRepository.findUserByUserId(contributorId);
    if (!foundUser) {
      throw new NotFoundError("user");
    }

    return this.projectRepository.updateUserProjectRole(
      contributorId,
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
    return userProjects
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
      return projectUsers;
    } else {
      throw new AuthorizationError();
    }
  }
}
