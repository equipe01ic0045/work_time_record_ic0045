import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../prisma/client";

export class TimeRecordsRepository {
    private readonly client: PrismaClient;

    constructor() {
        this.client = PrismaClientSingleton.getInstance().getClient();
    }

    async findOpenCheckinTimeRecord(userId: number, projectId: number) {
        return this.client.time_record.findFirst({
            where: {
                user_id: userId,
                project_id: projectId,
                check_out_timestamp: null
            }
        })
    }

    async createTimeRecord(userId: number, projectId: number, checkinTimeStamp: Date, userMessage?: string, location?: string) {
        return this.client.time_record.create({
            data: {
                user_id: userId,
                project_id: projectId,
                check_in_timestamp: checkinTimeStamp,
                user_message: userMessage,
                location: location,
            }
        });
    }

    async checkoutTimeRecord(timeRecordId: number, checkoutTimeStamp: Date) {
        return this.client.time_record.update({
            where: {
              time_record_id: timeRecordId,
              check_out_timestamp: null,
            },
            data: {
              check_out_timestamp: checkoutTimeStamp
            },
          });
    }



}