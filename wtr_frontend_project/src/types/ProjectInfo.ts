export default interface ProjectInfo {
  project_id?: number | undefined;
  project_name?: string | undefined;
  project_description?: string | undefined
  owner?: {
    email?:string | undefined
  };
  location_required?: boolean;
  location?: string | undefined;
  timezone?: string | undefined;
  commercial_time_required?: boolean;
  commercial_time_start?: number | undefined;
  commercial_time_end?: number | undefined;
  users_count?: number | undefined;
  created_at?: Date;
  updated_at?: Date;
}
