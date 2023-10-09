type TimeRecord = {
  time_record_id: number,
  user_id: number,
  project_id: number,
  check_in_timestamp: string,
  check_out_timestamp?: string,
  user_message?: string,
  location?: string,
  created_at: string,
  updated_at: string,
}

export default TimeRecord;