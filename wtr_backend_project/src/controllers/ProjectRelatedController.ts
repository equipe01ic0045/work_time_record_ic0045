import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import { body, ValidationChain } from "express-validator";

export default abstract class ProjectRelatedController extends BaseController {
  protected projectIdValidation: ValidationChain[] = [
    param("project_id")
      .isInt()
      .withMessage("ID do projeto deve ser um inteiro"),
  ];
}
