import axios from 'axios';

export interface TimeRecord {
  time_record_id: number;
  check_in_timestamp: string;
  check_out_timestamp: string;
  location: string;
  description: string;
  user_message: string;
  documents: string[];
}

export type PaginationData<T> = {
  page: number;
  limit: number;
  results: T[];
};

function TimeRecordsProvider() {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
  });

  return {
    async getTimeRecords(projectId: string, startDate?: string, fromDate?: string): Promise<PaginationData<TimeRecord>> {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        "page": 1,
        "limit": 10,
        "results": [
          {
            "time_record_id": 1,
            "check_in_timestamp": "2021-08-01T02:00:00.000Z",
            "check_out_timestamp": "2021-08-01T04:00:00.000Z",
            "documents": [],
            "description": "description",
            "user_message": "2",
            "location": "string"
          },
          {
            "time_record_id": 2,
            "check_in_timestamp": "2021-08-01T06:00:00.000Z",
            "check_out_timestamp": "2021-08-01T07:00:00.000Z",
            "documents": [],
            "description": "description",
            "user_message": "1",
            "location": "string"
          },
          {
            "time_record_id": 3,
            "check_in_timestamp": "2021-08-01T08:00:00.000Z",
            "check_out_timestamp": "2021-08-01T10:00:00.000Z",
            "documents": [],
            "description": "description",
            "user_message": "2",
            "location": "string"
          }
        ]
      };

      const { data } = await axiosInstance.get(`projects/${projectId}/time-records`);

      return data;
    }
  };
}

export default TimeRecordsProvider();