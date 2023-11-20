export type JustificationData = {
  justification_id: number;
  time_record_id: number;
  project_id: number;
  user_id: number;
  reviewer_id: number;
  user_message: string;
  reviewer_message: string;
  justification_type: "CHECKIN" | "CHECKOUT";
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
};

export type Justification = JustificationData & {
  reviewer: {
    full_name: string;
    email: string;
    cpf: string;
  };
};

export type JustificationInfoManager = JustificationData & {
  updated_at: string;
  user: {
    user_id: number;
    email: string;
    full_name: string;
    cpf: string;
  };

  time_record: {
    check_in_timestamp: string;
    check_out_timestamp: string | undefined;
  };

  justification_document: {
    justification_id: number;
  };
};

export type TimeRecord = {
  time_record_id: number;
  user_id: number;
  project_id: number;
  check_in_timestamp: string;
  check_out_timestamp?: string;
  user_message?: string;
  location?: string;
  created_at: string;
};

export type TimeRecordInfo = TimeRecord & {
  time_record_justification?: Justification[];
};
