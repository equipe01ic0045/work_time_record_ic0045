import RecordDocument from "./RecordDocument";

type TimeRecordData = {
  date: Date;
  documents: RecordDocument[];
  description: string;
  projectId: number;
  location?: { latitude: number, longitude: number };
}

export default TimeRecordData;