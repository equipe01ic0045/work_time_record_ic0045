import { PrismaClient } from '@prisma/client';

export default class PrismaClientSingleton {
  private static instance: PrismaClientSingleton;
  private prisma: PrismaClient;

  private constructor() {
    // Initialize Prisma Client
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaClientSingleton {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClientSingleton();
    }
    return PrismaClientSingleton.instance;
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }
}

