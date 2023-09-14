import { PrismaClient } from "@prisma/client";

export default class AuthService {
  private prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async createUser(full_name: string, password: string, email: string) {
    return this.prisma.user.create({
      data: {
        full_name,
        password,
        email,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
