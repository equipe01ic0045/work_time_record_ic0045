import { UserRole } from "@prisma/client";
import BaseService from "./BaseService";

export default abstract class AuthorizedService extends BaseService {
  // checks if user exists and has one of the specified roles in a given project
  protected async validateUser(
    userId: number,
    projectId: number,
    roles: UserRole[] = ["ADMIN", "MANAGER", "USER"]
  ) {
    return !!(await this.prisma.user_project_role.findUnique({
      where: {
        user_id_project_id: {
          user_id: userId,
          project_id: projectId,
        },
        role: {
          in: roles,
        },
      },
    }));
  }
}
