import { AbsenseDocument } from "./AbsenseDocument";
import { Project } from "./Project";
import { User } from "./User";

export class TimeRecord {
    time_record_id: number;
    user: User;
    project: Project;
    check_in_timestanp: Date;
    check_out_timestamp: Date;
    user_message: string;
    location: string;
    created_at: Date;
    absense_documents: AbsenseDocument[]
}