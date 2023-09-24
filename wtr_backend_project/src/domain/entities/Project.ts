import { ProjectConfiguration } from "./ProjectConfiguration";
import { TimeRecord } from "./TimeRecord";
import { UserProjectRole } from "./UserProjectRole";

export class Project {
    project_id: number;
    project_name: string;
    user_project_roles: UserProjectRole[];
    time_records: TimeRecord[];
    project_configurations: ProjectConfiguration[];
    created_at: Date;
    updated_at: Date;
}