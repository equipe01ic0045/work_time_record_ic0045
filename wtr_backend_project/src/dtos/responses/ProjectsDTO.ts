import { UserRole } from "../../domain/entities/UserRole";

export interface GetUserProjectResponseDTO {
    userId: number;
    fullName: string;
    email: string;
    role: UserRole;
    hoursPerWeek: number;
};

export interface GetUserProjectsResponseDTO {
    projectId: number;
    projectName: string;
    createdAt: Date;
    updatedAt: Date;
    hoursPerWeek: number;
}

export interface CreatedProjectResponseDTO {
    projectName: string;
    projectId: number;
    createdAt: Date;
    updatedAt: Date;
}