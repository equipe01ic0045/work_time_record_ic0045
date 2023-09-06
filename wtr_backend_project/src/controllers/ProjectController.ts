import { Request, Response } from "express";
import { projectService } from "../prisma/services";
import { user } from "@prisma/client";

export default class ProjectController {

  async getUserProjects(req: Request, res: Response) {
    const { full_name, password, email } = req.body;

    projectService.getUserProjects()

  }



}
