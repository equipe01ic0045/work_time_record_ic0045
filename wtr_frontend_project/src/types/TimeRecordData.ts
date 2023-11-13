export type Justification = {
  description?: string;
  document?: File|null;
  date?: Date;
};

export type JustificationData = Justification & {
  date: Date;
  projectId: number;
  timeRecordId: number;
}

type TimeRecordData = Justification & {
  timestamp: Date;
  projectId: number;
  location?: string;
};



export default TimeRecordData;