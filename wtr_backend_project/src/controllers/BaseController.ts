import { NextFunction, Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import ValidationErrorResponse from "../types/responses/ValidationErrorResponse";

export default abstract class BaseController {
  public router: Router = Router();
  protected abstract initRoutes(): void;

  constructor() {
    this.initRoutes();
  }

  protected validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      new ValidationErrorResponse().send(res, { errors: errors.array() });
    }
  }
}
