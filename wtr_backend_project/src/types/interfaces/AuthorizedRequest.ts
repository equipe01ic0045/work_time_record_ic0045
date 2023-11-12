import { Request } from "express";

export default interface AuthorizedRequest extends Request {
  user?: { userId: number };
}
