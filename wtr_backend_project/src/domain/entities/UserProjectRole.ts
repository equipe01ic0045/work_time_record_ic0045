import { UserRole } from "@prisma/client";
import { User } from "./User";
import { Project } from "./Project";

export class UserProjectRole {
    user_project_role_id: number;
    user: User;
    project: Project;
    role: UserRole;
    hours_per_week: number;
    created_at: Date;
    updated_at: Date;  
};