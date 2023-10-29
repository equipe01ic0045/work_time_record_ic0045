export type Justification = {
  justification_id: number,
  description: string,
  type: 'check-in' | 'check-out',
  file?: string,
  datetime: string,
  status: 'pending' | 'approved' | 'rejected',
  created_at: string,
};

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
  justifications?: Justification[]
}

export default TimeRecord;