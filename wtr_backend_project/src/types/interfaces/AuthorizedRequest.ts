import { Request } from "express";

export default interface AuthorizedRequest extends Request {
  user?: { userId: number };
}

export interface AuthorizedFileRequest extends AuthorizedRequest {
  file: Express.Multer.File;
}

