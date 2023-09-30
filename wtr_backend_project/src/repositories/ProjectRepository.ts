
import { PrismaClient } from "@prisma/client";
import { UserRole } from "../types/dtos/ProjectsDTO";





export class ProjectRespository {
    private readonly client: PrismaClient

    constructor() {
      this.client = new PrismaClient();
    }
  
    async findProjectByProjectName(projectName: string) {
        return this.client.project.findUnique({
            where: { project_name: projectName },
          })
    }

    async createProject(adminId: number, projectName: string, hoursPerWeek: number) {
        const newProject = await this.client.project.create({
            data: {
              project_name: projectName,
            },
          });
    
          await this.client.user_project_role.create({
            data: {
              user: {
                connect: {
                  user_id: adminId,
                },
              },
              project: {
                connect: {
                  project_id: newProject.project_id,
                },
              },
              role: "ADMIN",
              hours_per_week: hoursPerWeek,
            },
          });
    
          return newProject;
    }

  async updateUserProjectRole(contributorId: number, projectId: number, newContributorRole: UserRole, newHoursPerWeek: number,) {
        return this.client.user_project_role.create({
            data: {
              user_id: contributorId,
              project_id: projectId,
              role: newContributorRole,
              hours_per_week: newHoursPerWeek,
            },
          });
    }

    async findProjectsByUserId(userId: number) {
        return this.client.user_project_role.findMany({
            where: {
              user_id: userId,
            },
            select: {
              project: true 
            },
          });
    }

    async findUsersByProjectId(projectId: number) {
      return this.client.user_project_role.findMany({
        where: {
          project_id: projectId
        },
        select: {
            user: {
              select: {
                user_id: true,
                full_name: true,
                email: true,
              }
            },
            role: true,
            hours_per_week: true,
        },
      });
    }

    

}