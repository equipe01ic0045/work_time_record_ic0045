import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { NextFunction, Response } from "express";
import { projectService } from "../services";
import BaseController from "./abstract/BaseController";
import {
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
  DataRetrievedResponse,
} from "../types/responses";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export default class ProjectController extends BaseController {
  async createNewProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      project_name,
      project_description,
      location_required,
      commercial_time_required,
      timezone,
      location,
      commercial_time_start,
      commercial_time_end,
    } = req.body;
    

    try {
      await projectService.createProject(
        req.user!.userId,
        project_name,
        project_description,
        location_required,
        commercial_time_required,
        timezone,
        location,
        commercial_time_start,
        commercial_time_end
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
  

  async updateProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      project_id,
      project_name,
      project_description,
      location_required,
      commercial_time_required,
      timezone,
      location,
      commercial_time_start,
      commercial_time_end,
    } = req.body;
    try {
      await projectService.updateProject(
        project_id,
        project_name,
        project_description,
        location_required,
        commercial_time_required,
        timezone,
        location,
        commercial_time_start,
        commercial_time_end
      );
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }


  async deleteProject(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      project_id,
    } = req.body;
    try {
      await projectService.deleteProject(
        project_id,
      );
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
    const { project_id } = req.params;
    const { user_email, user_role, user_hours_per_week } = req.body;
    try {
      await projectService.addUserToProject(
        req.user!.userId,
        parseInt(project_id),
        user_email,
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
    const { project_id } = req.params;
    const { user_email, user_role, user_hours_per_week } = req.body;
    try {
      await projectService.updateProjectUserRole(
        req.user!.userId,
        parseInt(project_id),
        user_email,
        user_role,
        user_hours_per_week
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
      const projects = await projectService.getUserProjects(req.user!.userId);
      new DataRetrievedResponse().send(res, projects);
    } catch (error) {
      next(error);
    }
  }

  async getProjectInfo(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    try {
      const projectUsers = await projectService.getProjectById(
        req.user!.userId,
        parseInt(project_id)
      );
      new DataRetrievedResponse().send(res, projectUsers);
    } catch (error) {
      next(error);
    }
  }

  async getProjectUsers(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { project_id } = req.params;
    try {
      const projectUsers = await projectService.getProjectUsers(
        req.user!.userId,
        parseInt(project_id)
      );
      new DataRetrievedResponse().send(res, projectUsers);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const admin_id = req.user!.userId;
      const { user_id, project_id } = req.params;
      const deletedUser =  await projectService.deleteUser(admin_id, +project_id, +user_id);
      new ResourceUpdatedResponse().send(res, deletedUser, "Usuário deletado com sucesso");
    } catch(error){
      next(error);
    }
  }
}
