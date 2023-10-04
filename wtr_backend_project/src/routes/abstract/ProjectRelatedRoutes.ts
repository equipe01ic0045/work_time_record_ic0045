import { param, ValidationChain } from "express-validator";
import BaseRoutes from "./BaseRoutes";

export default abstract class ProjectRelatedRoutes extends BaseRoutes {
  protected projectIdValidation: ValidationChain[] = [
    param("project_id")
      .isInt()
      .withMessage("ID do projeto deve ser um inteiro"),
  ];
}
