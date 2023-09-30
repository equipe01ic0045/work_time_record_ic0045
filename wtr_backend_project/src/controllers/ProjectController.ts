import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { projectService } from "../services";
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
      const { projectName, hoursPerWeek } = req.body;
      await projectService.createProject({ projectName, contributorId: +req.user!.userId, hoursPerWeek });
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
      await projectService.addUserToProject({
        projectId: parseInt(project_id),
        adminUserId: req.user!.userId,
        contributorId: user_id,
        contributorRole: user_role,
        contributorHoursPerWeek: user_hours_per_week
      });
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
      await projectService.updateProjectUserRole({
        projectId: parseInt(project_id),
        adminId: req.user!.userId,
        contributorId: user_id,
        newContributorRole: new_role,
        newHoursPerWeek: new_hours_per_week
      });
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
