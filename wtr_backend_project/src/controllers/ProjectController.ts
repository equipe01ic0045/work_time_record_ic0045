import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { projectService } from "../prisma/services";
import { UserRole, project } from "@prisma/client";
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";
import ResourceUpdatedResponse from "../types/responses/ResourceUpdatedResponse";
import DataRetrievedResponse from "../types/responses/DataRetrievedResponse";
import BaseController from "./BaseController";
import { body, param } from "express-validator";

export default class ProjectController extends BaseController {
  protected initRoutes(): void {
    this.router.get("/", this.getUserProjects);
    this.router.post(
      "/",
      [
        body("project_name")
          .notEmpty()
          .withMessage("Nome do projeto requerido")
          .custom((value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          .withMessage(
            'Nome do projeto inválido. Nomes de projeto devem ter apenas letras minúsculas e números separados por hífen, examplo: "examplo-nome-de-projeto-32"'
          ),
      ],
      this.validate,
      this.createNewProject
    );
    this.router.post(
      "/:project_id/users",
      [
        param("project_id")
          .isInt()
          .withMessage("ID do projeto deve ser um inteiro"),
        body("user_id")
          .isInt()
          .withMessage("ID do usuario deve ser um inteiro"),
        body("user_role")
          .custom((value: string) =>
            Object.values(UserRole).includes(value as UserRole)
          )
          .withMessage("role invalida"),
        body("user_hours_per_week")
          .isInt()
          .withMessage("horas de trabalho deve ser numero inteiro"),
      ],
      this.validate,
      this.addUserToProject
    );
    this.router.get(
      "/:project_id/users",
      [
        
      ],
      this.validate,
      this.getProjectUsers
    );
    this.router.put(
      "/:project_id/users",
      [],
      this.validate,
      this.updateUserRole
    );
  }

  async createNewProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_name } = req.body;
      await projectService.createProject(project_name, req.user!.userId);
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async addUserToProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id } = req.params;
      const { user_id, user_role, user_hours_per_week } = req.body;
      await projectService.addUserToProject(
        parseInt(project_id),
        req.user!.userId,
        user_id,
        user_role,
        user_hours_per_week
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id } = req.params;
      const { user_id, new_role, new_hours_per_week } = req.body;
      await projectService.updateProjectUserRole(
        parseInt(project_id),
        req.user!.userId,
        user_id,
        new_role,
        new_hours_per_week
      );
      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async getUserProjects(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const projects: project[] = await projectService.getUserProjects(
        req.user!.userId
      );
      new DataRetrievedResponse().send(res, projects);
    } catch (error) {
      next(error);
    }
  }

  async getProjectUsers(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { project_id } = req.params;
      const projectUsers = await projectService.getProjectUsers(
        req.user!.userId,
        parseInt(project_id)
      );
      new DataRetrievedResponse().send(res, projectUsers);
    } catch (error) {
      next(error);
    }
  }
}
