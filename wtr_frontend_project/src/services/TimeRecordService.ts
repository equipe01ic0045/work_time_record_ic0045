import axios from "./axios";
import PaginationData from "@/types/PaginationData";
import { TimeRecord, TimeRecordInfo } from "@/types/TimeRecordInfoData";
import {
  DetailedTimeRecordData,
  SimpleTimeRecordData,
} from "@/types/TimeRecordData";

export default class TimeRecordService {
  static async getTimeRecords(
    projectId: number,
    from?: string,
    to?: string
  ): Promise<PaginationData<TimeRecord>> {
    const { data } = await axios.get(
      `/projects/time-records/${projectId}?from=${from}&to=${to}`
    );

    return {
      page: 1,
      limit: 100,
      results: data.data,
    };
  }

  async simpleCheckIn(checkInData: SimpleTimeRecordData) {
    const { data } = await axios.post(
      `/projects/time-records/${checkInData.project_id}/check-in`,
      {
        location: checkInData.location,
        check_in_timestamp: checkInData.timestamp,
      }
    );

    return data;
  }

  async simpleCheckOut(checkOutData: SimpleTimeRecordData) {
    const { data } = await axios.put(
      `/projects/time-records/${checkOutData.project_id}/check-out`,
      {
        check_out_timestamp: checkOutData.timestamp,
      }
    );

    return data;
  }

  async detailedCheckIn(formData: DetailedTimeRecordData) {
    const { data } = await axios.post(
      `/projects/time-records/${formData.project_id}/check-in/detailed`,
      {
        project_id: formData.project_id,
        check_in_timestamp: formData.timestamp,
        location: formData.location,
        user_message: formData.user_message,
        justification_file: formData.justification_file,
      },
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );

    return data;
  }

  async detailedCheckOut(formData: DetailedTimeRecordData) {
    const { data } = await axios.put(
      `/projects/time-records/${formData.project_id}/check-out/detailed`,
      {
        project_id: formData.project_id,
        check_out_timestamp: formData.timestamp,
        user_message: formData.user_message,
        justification_file: formData.justification_file,
      },
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );

    return data;
  }

  async getTimeRecordInfo(time_record_id: number): Promise<TimeRecordInfo> {
    const { data } = await axios.get(
      `/projects/time-records/info/${time_record_id}`
    );
    return data.data;
  }

  async getUserProjectTimeRecordsInfo() {
    const result = await axios.get("/projects/time-records/info/list/user");
    return result.data.data;
  }

  static async updateTimeRecord({
    timeRecordId,
    checkInTimestamp,
    checkOutTimestamp,
    userMessage,
    reviewerMessage,
    status = "PENDING",
    justificationFile,
  }: {
    timeRecordId: number;
    checkInTimestamp?: Date;
    checkOutTimestamp?: Date;
    userMessage: string;
    reviewerMessage?: string;
    status?: string;
    justificationFile?: File;
  }) {
    const response = await axios.put(`/projects/time-records/info/${timeRecordId}`, {
      check_in_timestamp: checkInTimestamp,
      check_out_timestamp: checkOutTimestamp,
      user_message: userMessage,
      reviewer_message: reviewerMessage,
      status: status,
      justification_file: justificationFile,
    });
    
    return response.data.data;
  }
}
