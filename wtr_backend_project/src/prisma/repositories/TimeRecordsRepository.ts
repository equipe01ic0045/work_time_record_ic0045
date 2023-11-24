import BaseRepository from "./abstract/BaseRepository";

export default class TimeRecordsRepository extends BaseRepository {
  async findOpenCheckinTimeRecord(user_id: number, project_id: number) {
    return this.client.time_record.findFirst({
      where: {
        user_id,
        project_id,
        check_out_timestamp: null,
      },
    });
  }

  async checkInTimeRecord(
    user_id: number,
    project_id: number,
    check_in_timestamp: Date,
    location?: string
  ) {
    const newTimeRecord = await this.client.time_record.create({
      data: {
        user_id,
        project_id,
        check_in_timestamp,
        location,
      },
    });

    await this.client.user_project_role.update({
      where: { user_id_project_id: { user_id, project_id } },
      data: { open_check_in: true },
    });

    return newTimeRecord;
  }

  async checkoutTimeRecord(time_record_id: number, check_out_timestamp: Date) {
    const timeRecord = await this.client.time_record.findUnique({
      where: { time_record_id },
    });

    const elapsed_time = Math.floor(
      (check_out_timestamp.getTime() -
        timeRecord!.check_in_timestamp.getTime()) /
        1000
    );

    // Update the time record
    const updatedTimeRecord = await this.client.time_record.update({
      where: { time_record_id },
      data: {
        check_out_timestamp,
        elapsed_time,
        updated_at: new Date(),
      },
    });

    await this.client.user_project_role.update({
      where: {
        user_id_project_id: {
          user_id: updatedTimeRecord.user_id,
          project_id: updatedTimeRecord.project_id,
        },
      },
      data: { open_check_in: false },
    });

    return updatedTimeRecord;
  }

  async getUsersElapsedTime(project_id: number, from: Date, to: Date) {
    const elapsedTimeSum = await this.client.time_record.groupBy({
      by: ["user_id"],
      _sum: {
        elapsed_time: true,
      },
      where: {
        project_id,
        updated_at: {
          gte: from,
          lte: to,
        },
        time_record_justification: {
          every: {
            status: {
              not: "PENDING",
            },
          },
        },
      },
    });

    // The result will be an array with the sum of elapsed_time for each specified user
    const userElapsedTimeSum = elapsedTimeSum.map((user) => ({
      user_id: user.user_id,
      elapsed_time_sum: user._sum?.elapsed_time || 0,
    }));

    return userElapsedTimeSum;
  }
  async getUserTimeRecordsInProject(
    user_id: number,
    project_id: number,
    from?: Date,
    to?: Date
  ) {
    return this.client.time_record.findMany({
      where: {
        user_id,
        project_id,
        check_in_timestamp: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        check_in_timestamp: "desc",
      },
      take: 100,
    });
  }

  async findTimeRecordById(time_record_id: number) {
    return this.client.time_record.findUnique({
      where: { time_record_id },
    });
  }

  async findTimeRecordInfo(time_record_id: number) {
    return this.client.time_record.findUnique({
      where: { time_record_id },
      select: {
        time_record_id: true,
        user_id: true,
        project_id: true,
        check_in_timestamp: true,
        check_out_timestamp: true,
        location: true,
        created_at: true,
        time_record_justification: {
          select: {
            justification_id: true,
            time_record_id: true,
            project_id: true,
            user_id: true,
            reviewer_id: true,
            user_message: true,
            reviewer_message: true,
            justification_type: true,
            status: true,
            created_at: true,
            reviewer: {
              select: {
                full_name: true,
                cpf: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async updateTimeRecord(
    time_record_id: number,
    check_in_timestamp?: Date,
    check_out_timestamp?: Date
  ) {
    return this.client.time_record.update({
      where: { time_record_id },
      data: {
        check_in_timestamp,
        check_out_timestamp,
        updated_at: new Date(),
      },
    });
  }

  async findUserProjectTimeRecords(user_id: number) {
    return this.client.user_project_role.findMany({
      where: { user_id },
      select: {
        project: {
          select: {
            project_id: true,
            project_name: true,
            owner: {
              select: {
                user_id: true,
                full_name: true,
                email: true,
              },
            },
            time_records: {
              orderBy: {
                created_at: "desc",
              },
              take: 1,
              select: {
                check_in_timestamp: true,
                check_out_timestamp: true,
              },
            },
            location: true,
          },
        },
        open_check_in: true,
      },
    });
  }
}
