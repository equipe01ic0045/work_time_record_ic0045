import BaseRepository from "./abstract/BaseRepository";

export default class TimeRecordsRepository extends BaseRepository {
  async findOpenCheckinTimeRecord(userId: number, projectId: number) {
    return this.client.time_record.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
        check_out_timestamp: null,
      },
    });
  }

  async createTimeRecord(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage?: string,
    location?: string
  ) {
    return this.client.time_record.create({
      data: {
        user_id: userId,
        project_id: projectId,
        check_in_timestamp: checkInTimestamp,
        location: location,
      },
    });
  }

  async checkoutTimeRecord(timeRecordId: number, checkoutTimeStamp: Date) {
    return this.client.time_record.update({
      where: {
        time_record_id: timeRecordId,
        check_out_timestamp: null,
      },
      data: {
        check_out_timestamp: checkoutTimeStamp,
      },
    });
  }

  async findTimeRecordById(timeRecordId: number) {
    return this.client.time_record.findUnique({
      where: {
        time_record_id: timeRecordId,
      },
    });
  }

}
