import { PrismaClient } from "@prisma/client";
import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/entities/Project";
import { CreateProjectRequestDTO, GetAllUserProjectRolesRequestDTO, GetProjectUsersRequestDTO, GetUserProjectRoleRequestDTO, UpdateProjectUserRoleRequestDTO } from "../../dtos/requests/ProjectsDTO";
import { ProjectMapper } from "../../mappers/ProjectMapper";
import { CreatedProjectResponseDTO } from "../../dtos/responses/ProjectsDTO";
import { UserProjectRole } from "../../domain/entities/UserProjectRole";

export class ProjectRepositoryWrapper implements ProjectRepository {
    constructor(private readonly client: PrismaClient){}

    async createProject(data: CreateProjectRequestDTO): Promise<CreatedProjectResponseDTO> {
        const createdProject = await this.client.project.create({
            data: {
                project_name: data.projectName,
                user_project_roles: {
                    create: {
                        role: "ADMIN",
                        user: {
                            connect: {
                                user_id: data.userId
                            } 
                        },
                        hours_per_week: data.hoursPerWeek ?? 40,
                    },
                },
            },
        });
        return ProjectMapper.toCreatedProjectResponseDTO(createdProject);
    }
    
    async findProjectUsers(data: GetProjectUsersRequestDTO): Promise<UserProjectRole[]> {
        const foundProjectUsers = this.client.user_project_role.findMany({
            where: {
                project_id: data.projectId,
            }, 
            include: {
                user: {
                    select: {
                        email: true,
                        full_name: true,
                    }
                }
            }
        });
        return foundProjectUsers;
    }
    
    async findUserProjectRole(data: GetUserProjectRoleRequestDTO): Promise<UserProjectRole | undefined> {
        
    }
    
    async findUserProjectsRoles(data: GetAllUserProjectRolesRequestDTO): Promise<UserProjectRole[]> {
        
    }
    
    async updateUserRole(data: UpdateProjectUserRoleRequestDTO): Promise<UserProjectRole> {
        
    }


}