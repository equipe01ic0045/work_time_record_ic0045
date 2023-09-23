import { Project } from "./Project";

export class ProjectConfiguration {
    project_documents: boolean;
    project_time_interval: Date;
    project_time_start: Date;
    project_time_end: Date;
    project?: ProjectConfiguration; 
}