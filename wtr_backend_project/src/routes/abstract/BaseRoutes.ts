import { NextFunction, Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import ValidationErrorResponse from "../../types/responses/ValidationErrorResponse";
import BaseController from "../../controllers/abstract/BaseController";

export default abstract class BaseRoutes {
  protected _router: Router;
  constructor(protected controller: BaseController) {
    this._router = Router();
  }

  abstract get router(): Router;

  protected validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      new ValidationErrorResponse().send(res, { errors: errors.array() });
    }
  }
}
