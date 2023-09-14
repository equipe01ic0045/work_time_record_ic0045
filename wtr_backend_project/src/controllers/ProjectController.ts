import AuthorizedRequest from "../interfaces/AuthorizedRequest";
import { Response } from "express";
import { projectService } from "../prisma/services";
import { project, user } from "@prisma/client";

export default class ProjectController {
  async createNewProject(req: AuthorizedRequest, res: Response) {
    const { project_name } = req.body;

    await projectService.createProject(project_name, req.user!.userId);
    res.status(201).json({ message: "Projeto criado com sucesso." });
  }

  async addUserToProject(req: AuthorizedRequest, res: Response) {
    const { project_id } = req.params;
    const { user_id, user_role, user_hours_per_week } = req.body;

    await projectService.addUserToProject(
      parseInt(project_id),
      req.user!.userId,
      user_id,
      user_role,
      user_hours_per_week
    );
    res
      .status(201)
      .json({ message: `Usuario adicionado ao projeto com sucesso.` });
  }

  async updateUserRole(req: AuthorizedRequest, res: Response) {
    const { project_id } = req.params;
    const { user_id, new_role, new_hours_per_week } = req.body;
    await projectService.updateProjectUserRole(
      parseInt(project_id),
      req.user!.userId,
      user_id,
      new_role,
      new_hours_per_week
    );
    res.status(200).json({
      message: "Configuração do usuário no projeto atualizada com sucesso.",
    });
  }

  async getUserProjects(req: AuthorizedRequest, res: Response) {
    const projects: project[] = await projectService.getUserProjects(
      req.user!.userId
    );
    res.status(200).json({ projects });
  }

  async getProjectUsers(req: AuthorizedRequest, res: Response) {
    const { project_id } = req.params;
    const projectUsers = await projectService.getProjectUsers(
      req.user!.userId,
      parseInt(project_id)
    );

    res.status(200).json({ users: projectUsers });
  }
}
