import { TimeRecord } from "./TimeRecord";
import { UserProjectRole } from "./UserProjectRole";

export class User {
    user_id: number;
    full_name: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    user_project_roles: UserProjectRole[];
    time_records: TimeRecord[];
}