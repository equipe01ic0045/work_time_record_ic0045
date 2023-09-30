import {project, user_project_role } from "@prisma/client";
import ConflictError from "../types/errors/ConflictError";
import AuthorizationError from "../types/errors/AuthorizationError";
import AuthorizedService from "./AbsAuthorizedService";
import NotFoundError from "../types/errors/NotFoundError";
import { ProjectRespository } from "../repositories/ProjectRepository";
import { AddUserToProjectRequestDTO, CreateProjectRequestDTO, UpdateUserProjectRoleRequestDTO } from "../types/dtos/ProjectsDTO";
import { UserRepository } from "../repositories/UserRepository";
import ValidationError from "../types/errors/ValidationError";

export default class ProjectService extends AuthorizedService {
  private projectRepository: ProjectRespository;
  private userRepository: UserRepository; 
  private readonly DEFAULT_HOURS_PER_WEEK = 40;
  private readonly VALID_PROJECT_NAME_FORMAT = /^[a-z][a-z0-9_]*$/i
  
  constructor(){
    super();
    this.projectRepository = new ProjectRespository();
    this.userRepository =  new UserRepository();
  }

  isValidProjectName(projectName: string) {
    return this.VALID_PROJECT_NAME_FORMAT.test(projectName);
  }

  async createProject(data: CreateProjectRequestDTO): Promise<project> {

    const foundProject = await this.projectRepository.findProjectByProjectName(data.projectName);
    if (!this.isValidProjectName(data.projectName)) { throw new ValidationError("project name not valid"); }
    
    if (!foundProject) {
      const newProject = await this.projectRepository.createProject(
        data.contributorId,
        data.projectName,
        data.hoursPerWeek ?? this.DEFAULT_HOURS_PER_WEEK
      );
      return newProject;
    } else {
      throw new ConflictError("project");
    }
  }

  async addUserToProject(data: AddUserToProjectRequestDTO): Promise<user_project_role> {
    const isAllowedToEdit = await this.validateUser(data.adminUserId, data.projectId, ["ADMIN", "MANAGER"]);
    if (!isAllowedToEdit) { throw new AuthorizationError(); }
    const foundUser = await this.userRepository.findUserByUserId(data.contributorId);
    if (!foundUser) { throw new NotFoundError("user"); }
    try {
      return this.addUserToProject(data);
    } catch {
      throw new ConflictError("user role in project");
    }
  } 
  

  async updateProjectUserRole(data: UpdateUserProjectRoleRequestDTO): Promise<user_project_role> {
    
    const isAllowedToEdit = await this.validateUser(data.adminId, data.projectId, ["ADMIN", "MANAGER"]);
    if (!isAllowedToEdit) {   throw new AuthorizationError(); }

    const foundUser =  await this.userRepository.findUserByUserId(data.contributorId);
    if (!foundUser) {  throw new NotFoundError("user"); }

    return this.projectRepository.updateUserProjectRole(
      data.contributorId,
      data.projectId,
      data.newContributorRole,
      data.newHoursPerWeek,
    );
  }

  async getUserProjects(userId: number): Promise<project[]> {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    if (!foundUser) { throw new AuthorizationError();}
    const userProjects = await this.projectRepository.findProjectsByUserId(userId);
    return userProjects.map((userRole) => userRole.project);  
  }

  async getProjectUsers(userId: number, projectId: number): Promise<any> {
    const hasRoleInProject = await this.validateUser(userId, projectId);
    if (hasRoleInProject) {
      const projectUsers = await this.projectRepository.findProjectsByUserId(userId);
      return projectUsers;
    } else {
      throw new AuthorizationError();
    }
  }
}
