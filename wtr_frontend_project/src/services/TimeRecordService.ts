import TimeRecordData from "@/types/TimeRecordData";
import axios from "./axios";
import PaginationData from "@/types/PaginationData";
import TimeRecord from "@/types/TimeRecord";

export default class TimeRecordService {
  async getTimeRecords(...args: unknown[]): Promise<PaginationData<TimeRecord>> {
    throw new Error("Method not implemented.");
  }

  async checkIn(record: TimeRecordData) {
    const { data } = await axios.post(
      `/projects/time-records/${record.projectId}/check-in`,
      {
        user_message: record.description,
        location: record.location,
        check_in_timestamp: record.date.toISOString(),
        documents: record.documents,
      },
    );

    return data;
  }
}