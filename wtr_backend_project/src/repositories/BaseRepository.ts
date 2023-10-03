import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../prisma/client";

export abstract class BaseRepository {
    protected client: PrismaClient
    constructor() {
        this.client =  PrismaClientSingleton.getInstance().getClient();
    }
}