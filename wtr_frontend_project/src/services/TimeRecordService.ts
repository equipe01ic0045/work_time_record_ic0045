import TimeRecordData from "@/types/TimeRecordData";
import axios from "./axios";
import PaginationData from "@/types/PaginationData";
import TimeRecord from "@/types/TimeRecord";

export default class TimeRecordService {
  async getTimeRecords(projectId: number): Promise<PaginationData<TimeRecord>> {
    const { data } = await axios.get(`/projects/time-records/${projectId}`);

    return {
      page: 1,
      limit: 100,
      results: data.data,
    };
  }

  async checkIn(record: TimeRecordData) {
    const { data } = await axios.post(
      `/projects/time-records/${record.projectId}/check-in`,
      {
        user_message: record.description || "",
        location: record.location,
        check_in_timestamp: record.timestamp.toISOString()
      }
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
      }
    );

    return data;
  }

  async getTimeRecord(recordId: number): Promise<TimeRecord> {
    return {
      time_record_id: 1,
      check_in_timestamp: "2023-10-28T14:10:10.000Z",
      check_out_timestamp: "2023-10-28T18:10:10.000Z",
      user_message: "Teste",
      user_id: 1,
      project_id: 1,
      created_at: "2023-10-28T14:10:10.000Z",
      updated_at: "2023-10-28T14:10:10.000Z",
      justifications: [
        {
          justification_id: 2,
          description: "Teste sem arquivo (deve aparecer tooltip)",
          type: "check-out",
          datetime: "2023-10-29T14:10:10.000Z",
          status: "rejected",
          created_at: "2023-10-28T14:10:10.000Z",
        },
        {
          justification_id: 1,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
          Donec euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl.\
          Donec euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl.",
          type: "check-in",
          file: "Teste 2",
          datetime: "2023-10-29T14:10:10.000Z",
          status: "approved",
          created_at: "2023-10-28T13:10:10.000Z",
        },
        {
          justification_id: 3,
          description: "Teste sem arquivo (deve aparecer tooltip)",
          type: "check-out",
          datetime: "2023-10-29T14:10:10.000Z",
          status: "pending",
          created_at: "2023-10-28T15:10:10.000Z",
        },
      ],
    };

    const { data } = await axios.get(`/time-records/${recordId}`);

    return data.data;
  }
}
