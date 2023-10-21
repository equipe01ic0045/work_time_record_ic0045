export type Justification = {
  description: string;
  document?: File|null;
  date: Date;
};

export type JustificationData = Justification & {
  projectId: number;
  timeRecordId: number;
}

type TimeRecordData = Justification & {
  projectId: number;
  location?: string;
};

export default TimeRecordData;