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
    const newTimeRecord = await this.client.time_record.create({
      data: {
        user_id: userId,
        project_id: projectId,
        check_in_timestamp: checkInTimestamp,
        user_message: userMessage,
        location: location,
      },
    });

    await this.client.user_project_role.update({
      where: { user_id_project_id: { user_id: userId, project_id: projectId } },
      data: { open_check_in: true },
    });

    return newTimeRecord;
  }

  async checkoutTimeRecord(timeRecordId: number, checkoutTimeStamp: Date) {
    const openTimeRecord = await this.client.time_record.update({
      where: {
        time_record_id: timeRecordId,
        check_out_timestamp: null,
      },
      data: {
        check_out_timestamp: checkoutTimeStamp,
        updated_at: new Date(),
      },
    });

    await this.client.user_project_role.update({
      where: {
        user_id_project_id: {
          user_id: openTimeRecord.user_id,
          project_id: openTimeRecord.project_id,
        },
      },
      data: { open_check_in: false },
    });

    return openTimeRecord;
  }

  async getUserTimeRecordsInProject(userId: number, projectId: number) {
    return this.client.time_record.findMany({
      where: {
        user_id: userId,
        project_id: projectId,
      },
      orderBy: {
        check_in_timestamp: "desc",
      },
      take: 100,
    });
  }
}
