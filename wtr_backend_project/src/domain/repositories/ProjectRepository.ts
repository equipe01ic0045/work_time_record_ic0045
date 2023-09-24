import { CreateProjectRequestDTO, GetAllUserProjectRolesRequestDTO, GetProjectUsersRequestDTO, GetUserProjectRoleRequestDTO, UpdateProjectUserRoleRequestDTO } from "../../dtos/requests/ProjectsDTO";
import { CreatedProjectResponseDTO } from "../../dtos/responses/ProjectsDTO";
import { Project } from "../entities/Project";
import { UserProjectRole } from "../entities/UserProjectRole";

export interface ProjectRepository {
    createProject(data: CreateProjectRequestDTO): Promise<CreatedProjectResponseDTO>
    updateUserRole(data: UpdateProjectUserRoleRequestDTO): Promise<UserProjectRole>
    findUserProjectRole(data: GetUserProjectRoleRequestDTO): Promise<UserProjectRole | undefined>
    findUserProjectsRoles(data: GetAllUserProjectRolesRequestDTO): Promise<UserProjectRole[]>
    findProjectUsers(data: GetProjectUsersRequestDTO): Promise<UserProjectRole[]>;
}