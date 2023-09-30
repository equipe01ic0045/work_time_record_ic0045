type TimeRecord = {
  time_record_id: number;
  check_in_timestamp: string;
  check_out_timestamp: string;
  location: string;
  description: string;
  user_message: string;
  documents: string[];
}

export default TimeRecord;