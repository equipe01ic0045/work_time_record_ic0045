import { user } from ".prisma/client";
import BaseRepository from "./abstract/BaseRepository";

export default class UserRepository extends BaseRepository {
  async createUser(
    full_name: string,
    email: string,
    password: string
  ): Promise<user> {
    return this.client.user.create({
      data: {
        email,
        password,
        full_name,
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
        user_id,
      },
    });
  }
}
