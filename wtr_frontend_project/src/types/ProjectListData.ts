export default interface ProjectListData {
  project_id: number;
  project_name: string;
  owner: {
    email: string;
  };
  users_count: number;
  timezone: string;
  commercial_time_start: number | null;
  commercial_time_end: number | null;
}
