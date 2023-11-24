export default interface ProjectListData {
  project: {
    project_id: number;
    project_name: string;
    owner: {
      user_id: number;
      full_name: string;
      email: string;
    };
    users_count: number;
    timezone: string;
    commercial_time_start: number | null;
    commercial_time_end: number | null;
    _count: {
      time_record_justification: number;
    };
  };

  open_check_in: boolean;
  role: "ADMIN" | "MANAGER" | "USER";
}

type TimeRecordSnippet = {
  check_in_timestamp: string;
  check_out_timestamp: string;
};

export interface TimeRecordListData {
  project: {
    project_id: number;
    project_name: string;
    owner: {
      user_id: number;
      full_name: string;
      email: string;
    };
    time_records: TimeRecordSnippet[];
    location: string
  };
  open_check_in: boolean;
}
