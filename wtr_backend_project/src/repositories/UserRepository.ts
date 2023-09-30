import { PrismaClient } from "@prisma/client";

export class UserRepository {
    private readonly client: PrismaClient;
    constructor() {
        this.client =  new PrismaClient;
    }

    async createUser(full_name: string, email: string, password: string) {
        return this.client.user.create({
            data: {
                email: email,
                password: password,
                full_name: full_name,
            }
        })
    }


    async findUserByEmail(email: string) {
        return this.client.user.findUnique({
            where: {
                email
            }
        });
    }

    async findUserByUserId(userId: number) {
        return this.client.user.findUnique({
            where: {
                user_id: userId,
            }
        });
    }
}