import { ProjectServiceDependencies } from "../../domain/services/ProjectService"
import { ProjectServiceWrapper } from "./ProjectService"


export const servicesFactory = (dependencies: ProjectServiceDependencies)=> {
    return {
        projectService: new ProjectServiceWrapper(dependencies),
    }
}