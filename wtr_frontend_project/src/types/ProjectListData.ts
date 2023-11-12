export default interface ProjectListData {
  project: {
    project_id: number;
    project_name: string;
    owner: {
      full_name: string;
      email: string;
    };
    users_count: number;
    timezone: string;
    commercial_time_start: number | null;
    commercial_time_end: number | null;
  };
  open_check_in: boolean;
}
