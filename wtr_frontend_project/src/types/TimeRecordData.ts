export type SimpleTimeRecordData = {
  project_id: number;
  timestamp: Date;
  location?: string;
};

export type JustificationData = {
  user_message: string;
  justification_file?: File;
};

export type DetailedTimeRecordData = SimpleTimeRecordData & JustificationData;

export type CreatedJustificationData = DetailedTimeRecordData & {
  justification_id: number;
};
