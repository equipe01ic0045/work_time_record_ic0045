import { PrismaClient } from "@prisma/client";
import AuthService from "./AuthService";
import ProjectService from "./ProjectService";
import TimeRecordService from "./TimeRecordService";

const prismaClient = new PrismaClient();

export const authService = new AuthService(prismaClient);
export const projectService = new ProjectService(prismaClient);
export const timeRecordService = new TimeRecordService(prismaClient);
