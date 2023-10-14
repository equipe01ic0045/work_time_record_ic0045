import ProjectRepository from "../../prisma/repositories/ProjectRepository";
import { CustomValidator } from "express-validator";
import { AuthorizationError, ConflictError, ValidationError } from "../../types/errors";

export class ProjectValidator {
    private readonly projectRepository: ProjectRepository
    private static instance: ProjectValidator;

    private constructor() {
        this.projectRepository = new ProjectRepository();
    }

    public static getInstance(): ProjectValidator {
        if (!ProjectValidator.instance) {
            ProjectValidator.instance = new ProjectValidator();
        }
        return ProjectValidator.instance;
    }

    public isAbleToModifyProject: CustomValidator = async (input: { adminId: number, projectId: number }) => {
        const foundManagerAdminRole = await this.projectRepository.findUserProjectRole(input.adminId, input.projectId, ["ADMIN", "MANAGER"]);
        if (!foundManagerAdminRole) {
            throw new AuthorizationError();
        }
    }

    public isMemberOfTheProject: CustomValidator =  async (input: { userId: number, projectId: number }) => {
        const foundProjectRole =  await this.projectRepository.findUserProjectRole(input.userId, input.projectId);
        if (!foundProjectRole) {
            throw new AuthorizationError();
        }
        return true;
    }
    
    public isValidProjectName: CustomValidator = async (projectName: string) => {
        const validProjectNameRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!validProjectNameRegex.test(projectName)) {
            throw new ValidationError(
                'Nome do projeto inválido. Nomes de projeto devem ter apenas letras minúsculas e números separados por hífen, examplo: "examplo-nome-de-projeto-32"'
            );
        }
        const foundProject = await this.projectRepository.findProjectByProjectName(projectName);
        if (foundProject) {
            throw new ConflictError("project");
        }

        return true;
    }

}