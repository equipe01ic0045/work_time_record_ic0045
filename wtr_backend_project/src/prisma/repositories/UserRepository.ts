import { user } from ".prisma/client";
import BaseRepository from "./abstract/BaseRepository";

export default class UserRepository extends BaseRepository {
  private readonly findUserFields = {
    user_id: true,
    cpf: true,
    email: true,
    full_name: true,
    created_at: true,
    updated_at: true,
  };

  async createUser(
    full_name: string,
    email: string,
    password: string,
    cpf: string
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

  async deleteUserById(
    user_id: number
  ): Promise<Omit<user, "password"> | null> {
    return this.client.user.delete({
      where: { user_id },
    });
  }

  async findUserByUserId(
    user_id: number
  ): Promise<Omit<user, "password"> | null> {
    return this.client.user.findUnique({
      where: { user_id },
      select: this.findUserFields,
    });
  }

  async findUserByUserEmail(
    email: string
  ): Promise<Omit<user, "password"> | null> {
    return this.client.user.findUnique({
      where: { email },
      select: this.findUserFields,
    });
  }
  async findUsersByName(
    full_name: string
  ): Promise<Omit<user, "password">[]> {
    return this.client.user.findMany({ where: { full_name: {contains: full_name, mode: 'insensitive'} } });
  }

  async findUserByEmail(email: string): Promise<user | null> {
    return this.client.user.findUnique({
      where: { email },
    });
  }

  async findUserByCPF(cpf: string): Promise<user | null> {
    return this.client.user.findUnique({
      where: { cpf },
    });
  }

  async findUsersBySubstring(substring: string) {
    return this.client.user.findMany({
      where: {
        OR: [
          {
            full_name: {
              contains: substring,
            },
          },
          {
            email: {
              contains: substring,
            },
          },
        ],
      },
      select: {
        full_name: true,
        cpf: true,
        email: true
      },
    });
  }

  async updateUser(
    user_id: number,
    full_name: string,
    email: string,
    cpf: string,
    password?: string,
  ) {
    return this.client.user.update({
      where: { user_id },
      data: {
        full_name,
        ...(password != undefined ? {password} : {}), // Password is optional
        cpf,
        email,
      },
      select: this.findUserFields,
    });
  }
}
