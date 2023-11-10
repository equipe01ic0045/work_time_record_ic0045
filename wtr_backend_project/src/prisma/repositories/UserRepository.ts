import { user } from ".prisma/client";
import BaseRepository from "./abstract/BaseRepository";

export default class UserRepository extends BaseRepository {
  async createUser(
    full_name: string,
    email: string,
    password: string,
    cpf: number
  ): Promise<user> {
    return this.client.user.create({
      data: {
        cpf,
        email,
        full_name,
        password,
      },
    });
  }

  async findUserByEmail(email: string): Promise<user | null> {
    return this.client.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserByUserId(user_id: number): Promise<user | null> {
    return this.client.user.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }

  async deleteUserById(
    user_id: number
  ): Promise<Omit<user, "password"> | null> {
    return this.client.user.delete({
      where: {
        user_id,
      },
      select: {
        user_id: true,
        full_name: true,
        cpf: true,
        email: true,
        created_at: true,
        updated_at: true,
        user_project_roles: {
          select: {
            project: {
              select: {
                project_name: true,
                project_id: true,
              },
            },
            role: true,
          },
        },
      },
    });
  }
}
