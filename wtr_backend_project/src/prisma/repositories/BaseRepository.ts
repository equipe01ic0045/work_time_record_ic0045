import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../client";

export abstract class BaseRepository {
    protected client: PrismaClient
    constructor() {
        this.client =  PrismaClientSingleton.getInstance().getClient();
    }
}