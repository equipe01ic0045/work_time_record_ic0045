import { CreateProjectRequestDTO, GetProjectUsersRequestDTO, GetUserProjectRoleRequestDTO, GetUserProjectsRequestDTO, UpdateProjectUserRoleRequestDTO } from "../../dtos/requests/ProjectsDTO";
import { CreatedProjectResponseDTO } from "../../dtos/responses/ProjectsDTO";
import { ProjectMapper } from "../../mappers/ProjectMapper";
import { UserProjectRole } from "../entities/UserProjectRole";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { UserRepository } from "../repositories/UserRepository";

export interface ProjectServiceDependencies {
    repositories: {
        userRepository: UserRepository,
        projectRepository: ProjectRepository,
    },
    mappers: {

    }
}


export abstract class ProjectService {
    private readonly projectRepository: ProjectRepository;
    private readonly userRepository: UserRepository;
    private readonly VALID_PROJECT_NAME =  /^[a-z][a-z0-9\\_]+$/i;
    private readonly ALLOWED_USER_ROLES = ["ADMIN", "MANAGER"];

    constructor(dependencies: ProjectServiceDependencies){
        this.userRepository = dependencies.repositories.userRepository;
        this.projectRepository = dependencies.repositories.projectRepository;
    }

    protected isValidProjectName(projectName: string): boolean {
        return this.VALID_PROJECT_NAME.test(projectName);
    }

    protected isAllowedToList(userProjectRole: UserProjectRole) {
        return this.ALLOWED_USER_ROLES.includes(userProjectRole.role);
    }

    protected handleUserPermission(foundUserProjectRole?: UserProjectRole) {
        if (!foundUserProjectRole) { throw new Error() }
        if (!this.isAllowedToList(foundUserProjectRole)){}
       
    }

    async createProject(data: CreateProjectRequestDTO): Promise<CreatedProjectResponseDTO> {
        const createdProject = await this.projectRepository.createProject(data);
        return ProjectMapper.toCreatedProjectResponseDTO(createdProject);
    }

    async updateProjectUserRole(data: UpdateProjectUserRoleRequestDTO) {
        const foundUser =  await this.userRepository.findUserById({ userId: data.contributorId});        
        if (!foundUser) {}
        const updatedUserRole = await this.projectRepository.updateUserRole(data);
        return updatedUserRole;
    }

    async getProjectUsers(data: GetProjectUsersRequestDTO){
        const foundUserProjectRole = await this.projectRepository.findUserProjectRole(data);
        this.handleUserPermission(foundUserProjectRole);
        const foundUsers = await this.projectRepository.findProjectUsers(data);
        return ProjectMapper.toProjectUsersResponseDTO(foundUsers);
    }

    async getUserProjects(data: GetUserProjectsRequestDTO) {
        const foundUserProjectsRole = await this.projectRepository.findUserProjectsRoles(data);
        return ProjectMapper.toUserProjectsResponseDTO(foundUserProjectsRole);
    }

}