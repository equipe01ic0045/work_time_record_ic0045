export default interface ProjectInfo {
  project_id: number;
  project_name: string;
  project_description: string
  owner: {
    email:string
  };
  location_required: boolean;
  location: string | null;
  timezone: string;
  commercial_time_required: boolean;
  commercial_time_start: number | null;
  commercial_time_end: number | null;
  users_count: number;
  created_at: Date;
  updated_at: Date;
}
