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
        document: record.document,
      },
    );

    return data;
  }

  async checkOut(record: TimeRecordData) {
    const { data } = await axios.put(
      `/projects/time-records/${record.projectId}/check-out`,
      {
        user_message: record.description,
        check_out_timestamp: record.date.toISOString(),
        document: record.document,
      },
    );

    return data;
  }
}