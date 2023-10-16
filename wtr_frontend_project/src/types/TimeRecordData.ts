type TimeRecordData = {
  date: Date;
  document?: File|null;
  description?: string;
  projectId: number;
  location?: string;
};

export default TimeRecordData;