export interface CreateProjectRequestDTO {
    projectName: string,
    contributorId: number,
    hoursPerWeek?: number,
}

export interface UpdateUserProjectRoleRequestDTO {
    adminId: number,
    contributorId: number,
    projectId: number,
    newContributorRole: string,
    newHoursPerWeek: number,
}

export interface AddUserToProjectRequestDTO {
    projectId: number,
    adminUserId: number,
    contributorId: number,
    contributorRole: string,
    contributorHoursPerWeek: number
}