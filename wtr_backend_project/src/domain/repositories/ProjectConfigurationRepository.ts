
import { ProjectConfiguration } from "../entities/ProjectConfiguration";

export interface ProjectConfigurationRepository {
    findByProjectId(projectId: number): Promise<ProjectConfiguration | null>;
    create(configuration: ProjectConfiguration): Promise<ProjectConfiguration>;
    update(configuration: ProjectConfiguration): Promise<ProjectConfiguration>;
}