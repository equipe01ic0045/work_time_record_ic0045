import { NextFunction, Request, Response } from "express";
import BaseController from "./abstract/BaseController";
import { userService } from "../services";
import {
  AuthSuccessResponse,
  DataRetrievedResponse,
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
} from "../types/responses";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";

export default class UserController extends BaseController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    const { full_name, password, cpf, email } = req.body;
    try {
      await userService.createUser(full_name, email, password, cpf);
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const token = await userService.authenticateUser(email, password);
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

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req.params;
    try {
      const user = await userService.getUser(parseInt(user_id));
      new DataRetrievedResponse().send(res, user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const { user_email } = req.params;
    try {
      const user = await userService.getUserByEmail(user_email);
      new DataRetrievedResponse().send(res, user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const { full_name, email, password } = req.body;
    try {
      const newToken = await userService.updateUser(
        req.user!.userId,
        full_name,
        email,
        password
      );

      res.cookie("token", newToken, {
        httpOnly: false,
        maxAge: 3600000,
        sameSite: "strict",
      });

      new ResourceUpdatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
