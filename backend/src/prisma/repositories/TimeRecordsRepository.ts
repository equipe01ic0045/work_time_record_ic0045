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
    const openTimeRecord = await this.client.time_record.update({
      where: {
        time_record_id,
        check_out_timestamp: null,
      },
      data: {
        check_out_timestamp,
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

  async getUserTimeRecordsInProject(user_id: number, project_id: number) {
    return this.client.time_record.findMany({
      where: {
        user_id,
        project_id,
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
                full_name: true,
                email: true,
              },
            },
            time_records: {
              orderBy: {
                created_at: 'desc', 
              },
              take: 1, 
              select: {
                check_in_timestamp:true,
                check_out_timestamp: true
              },
            },    
          },
        },
        open_check_in: true,
      },
    });
  }
}
