import {project, user_project_role } from "@prisma/client";
import ConflictError from "../types/errors/ConflictError";
import AuthorizationError from "../types/errors/AuthorizationError";
import NotFoundError from "../types/errors/NotFoundError";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { AddUserToProjectRequestDTO, CreateProjectRequestDTO, UpdateUserProjectRoleRequestDTO } from "../types/dtos/ProjectsDTO";
import { UserRepository } from "../repositories/UserRepository";
import ValidationError from "../types/errors/ValidationError";

export default class ProjectService {
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository; 
  private readonly DEFAULT_HOURS_PER_WEEK = 40;
  private readonly VALID_PROJECT_NAME_FORMAT = /^[a-z][a-z0-9_]*$/i
  
  constructor(){
    this.projectRepository = new ProjectRepository();
    this.userRepository =  new UserRepository();
  }

  isValidProjectName(projectName: string) {
    return this.VALID_PROJECT_NAME_FORMAT.test(projectName);
  }

  async createProject( {
    contributorId,
    projectName,
    hoursPerWeek,
  }: CreateProjectRequestDTO): Promise<project> {

    const foundProject = await this.projectRepository.findProjectByProjectName(projectName);
    if (!this.isValidProjectName(projectName)) { throw new ValidationError("project name not valid"); }
    
    if (!foundProject) {
      const newProject = await this.projectRepository.createProject(
        contributorId,
        projectName,
        hoursPerWeek ?? this.DEFAULT_HOURS_PER_WEEK
      );
      return newProject;
    } else {
      throw new ConflictError("project");
    }
  }

  async addUserToProject({
    adminUserId,
    contributorHoursPerWeek,
    contributorId,
    contributorRole,
    projectId,
  } : AddUserToProjectRequestDTO): Promise<user_project_role> {
    const foundAdminRole = await this.projectRepository.findUserProjectRole(adminUserId, projectId, ["MANAGER", "ADMIN"]);
    if (!foundAdminRole) { throw new AuthorizationError(); }
    const foundUser = await this.userRepository.findUserByUserId(contributorId);
    if (!foundUser) { throw new NotFoundError("user"); }
    try {
      return this.projectRepository.addUserToProject(
        contributorId,
        projectId,
        contributorHoursPerWeek,
        contributorRole,
      );
    } catch {
      throw new ConflictError("user role in project");
    }
  } 
  

  async updateProjectUserRole({
    adminId,
    contributorId,
    newContributorRole,
    newHoursPerWeek,
    projectId
  }: UpdateUserProjectRoleRequestDTO): Promise<user_project_role> {
    
    const foundAdminRole = await this.projectRepository.findUserProjectRole(adminId, projectId, ["ADMIN", "MANAGER"]);
    if (!foundAdminRole) {   throw new AuthorizationError(); }

    const foundUser =  await this.userRepository.findUserByUserId(contributorId);
    if (!foundUser) {  throw new NotFoundError("user"); }

    return this.projectRepository.updateUserProjectRole(
      contributorId,
      projectId,
      newContributorRole,
      newHoursPerWeek,
    );
  }

  async getUserProjects(userId: number): Promise<project[]> {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    if (!foundUser) { throw new AuthorizationError();}
    const userProjects = await this.projectRepository.findProjectsByUserId(userId);
    return userProjects.map((userRole) => userRole.project);  
  }

  async getProjectUsers(userId: number, projectId: number): Promise<any> {
    const foundAdminUserRole = await this.projectRepository.findUserProjectRole(userId, projectId);
    if (!foundAdminUserRole) { throw new AuthorizationError(); }
    const projectUsers = await this.projectRepository.findProjectsByUserId(userId);
    return projectUsers;     
  }
}
