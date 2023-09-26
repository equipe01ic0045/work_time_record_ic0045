import { NextFunction, Request, Response } from "express";
import { authService } from "../prisma/services";
import BaseController from "./abstract/BaseController";
import {
  AuthSuccessResponse,
  ResourceCreatedResponse,
} from "../types/responses";

export default class AuthController extends BaseController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    const { full_name, password, email } = req.body;
    try {
      await authService.createUser(full_name, password, email);
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const token = await authService.authenticateUser(email, password);
      res.cookie("token", token, {
        httpOnly: false,
        maxAge: 3600000,
        sameSite: "strict",
      });
      new AuthSuccessResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
