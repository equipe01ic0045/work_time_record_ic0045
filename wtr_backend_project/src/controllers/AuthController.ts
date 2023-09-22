import { NextFunction, Request, Response } from "express";
import { authService } from "../prisma/services";
import AuthSuccessResponse from "../types/responses/AuthSuccessResponse";
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";

export default class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { full_name, password, email } = req.body;
      await authService.createUser(full_name, password, email);
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

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
