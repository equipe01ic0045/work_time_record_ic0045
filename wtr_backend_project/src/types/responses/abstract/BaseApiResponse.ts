import { Response } from "express";

export default abstract class BaseApiResponse {
  protected statusCode: number;
  protected success: boolean;
  protected message: string;

  constructor(statusCode: number, success: boolean, message: string) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
  }

  public send(res: Response, data?: any, message?: string) {
    if (message) this.message = message;
    res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data,
    });
  }
}
