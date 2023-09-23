import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { projectService } from "../prisma/services";
import { project } from "@prisma/client";
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";
import ResourceUpdatedResponse from "../types/responses/ResourceUpdatedResponse";
import DataRetrievedResponse from "../types/responses/DataRetrievedResponse";

export default class ProjectController {
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
