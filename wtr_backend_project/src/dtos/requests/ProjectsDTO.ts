import { UserRole } from "../../domain/entities/UserRole";

export interface CreateProjectRequestDTO {
    projectName: string;
    userId: number;
    project_time_start: Date;
    project_time_end: Date;
    project_time_interval: Date; 
    hoursPerWeek?: number; 
}

export interface AddUserToProjectRequestDTO {
    projectId: number;
    adminUserId: number;
    contributorId: number;
    contributorRole: UserRole
    contributorHoursPerWeek: number;
}

export interface UpdateProjectUserRoleRequestDTO {
    projectId: number;
    adminUserId: number;
    contributorId: number;
    newContributorRole: UserRole;
    newHoursPerWeek: number;
}

export interface GetUserProjectsRequestDTO {
    userId: number;
}

export interface GetProjectUsersRequestDTO {
    userId: number;
    projectId: number;
}

export interface GetUserProjectRoleRequestDTO {
    userId: number;
    projectId: number;
}

export interface GetAllUserProjectRolesRequestDTO {
    userId: number;
}

