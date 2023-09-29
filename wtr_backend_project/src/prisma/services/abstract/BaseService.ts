import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../../client";

export default abstract class BaseService {
  protected prisma: PrismaClient;
  constructor() {
    this.prisma = PrismaClientSingleton.getInstance().getClient();
  }
}
