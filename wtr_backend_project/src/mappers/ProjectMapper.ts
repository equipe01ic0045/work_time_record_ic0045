import { Project } from "../domain/entities/Project";
import { UserProjectRole } from "../domain/entities/UserProjectRole";
import { CreatedProjectResponseDTO, GetUserProjectResponseDTO } from "../dtos/responses/ProjectsDTO";

export class ProjectMapper {
    static toProjectUsersResponseDTO(userProjectRoles: UserProjectRole[]): GetUserProjectResponseDTO[] {
        return userProjectRoles.map(userProjectRole => ({
            userId: userProjectRole.user.user_id,
            email: userProjectRole.user.email,
            fullName: userProjectRole.user.email,
            hoursPerWeek: userProjectRole.hours_per_week,
            role: userProjectRole.role
        }));
    }

    static toUserProjectsResponseDTO(userProjectRoles: UserProjectRole[]): GetUserProjectResponseDTO[] {
        return userProjectRoles.map(userProjectRole => ({
            userId: userProjectRole.user.user_id,
            email: userProjectRole.user.email,
            fullName: userProjectRole.user.full_name,
            hoursPerWeek: userProjectRole.hours_per_week,
            role: userProjectRole.role,
        }));
    }

    static toCreatedProjectResponseDTO(createdProject: Omit<Project, 'user_project_roles' | 'time_records' | 'project_configurations' >): CreatedProjectResponseDTO {
        return ({
            projectName: createdProject.project_name,
            projectId: createdProject.project_id,
            createdAt: createdProject.created_at,
            updatedAt: createdProject.updated_at,
        });
    }

}