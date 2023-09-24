import { Project } from "../../domain/entities/Project";
import { UserProjectRole } from "../../domain/entities/UserProjectRole";
import { ProjectService } from "../../domain/services/ProjectService";
import { CreateProjectRequestDTO, GetProjectUsersRequestDTO, GetUserProjectsRequestDTO, UpdateProjectUserRoleRequestDTO } from "../../dtos/requests/ProjectsDTO";
import { GetUserProjectResponseDTO } from "../../dtos/responses/ProjectsDTO";

export class ProjectServiceWrapper extends ProjectService {
    async createProject(data: CreateProjectRequestDTO): Promise<Project> {
       return super.createProject(data);
    }

    async getProjectUsers(data: GetProjectUsersRequestDTO): Promise<GetUserProjectResponseDTO[]> {
       return super.getProjectUsers(data);
    }

    async getUserProjects(data: GetUserProjectsRequestDTO): Promise<GetUserProjectResponseDTO[]> {
        return super.getUserProjects(data);
    }

    async updateProjectUserRole(data: UpdateProjectUserRoleRequestDTO): Promise<UserProjectRole> {
        return super.updateProjectUserRole(data);
    }

    
}