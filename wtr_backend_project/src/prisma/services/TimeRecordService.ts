import { time_record } from "@prisma/client";
import AuthorizationError from "../../types/errors/AuthorizationError";
import ConflictError from "../../types/errors/ConflictError";
import NotFoundError from "../../types/errors/NotFoundError";
import AuthorizedService from "./AbsAuthorizedService";

export default class TimeRecordService extends AuthorizedService {
  async checkInTimeRecord(
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage: string | null,
    location: string | null
  ): Promise<time_record> {
    if (await this.validateUser(userId, projectId)) {
      // Check if there is an open check-in record for the user and project
      const existingCheckIn = await this.prisma.time_record.findFirst({
        where: {
          user_id: userId,
          project_id: projectId,
          check_out_timestamp: null, // Check if the check-out timestamp is null (i.e., open record)
        },
      });

      if (!existingCheckIn) {
        return await this.prisma.time_record.create({
          data: {
            user_id: userId,
            project_id: projectId,
            check_in_timestamp: checkInTimestamp,
            user_message: userMessage,
            location: location,
          },
        });
      } else {
        throw new ConflictError("open check-in");
      }
    } else {
      throw new AuthorizationError();
    }
  }

  async checkOutTimeRecord(
    userId: number,
    projectId: number,
    checkOutTimestamp: Date
  ): Promise<time_record> {
    if (await this.validateUser(userId, projectId)) {
      // Check if the record is open
      const existingCheckIn = await this.prisma.time_record.findFirst({
        where: {
          user_id: userId,
          project_id: projectId,
          check_out_timestamp: null,
        },
      });

      if (existingCheckIn) {
        return await this.prisma.time_record.update({
          where: {
            time_record_id: existingCheckIn.time_record_id,
            check_out_timestamp: null,
          },
          data: {
            check_out_timestamp: checkOutTimestamp
              ? checkOutTimestamp
              : new Date(),
          },
        });
      } else {
        throw new NotFoundError("open check-in");
      }
    } else {
      throw new AuthorizationError();
    }
  }
}
