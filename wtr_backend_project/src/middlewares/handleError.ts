import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../types/responses/ErrorResponse";
import BaseError from "../types/errors/BaseError";

export default function handleError(error:BaseError,req:Request,res:Response,next:NextFunction){
    new ErrorResponse(error.httpStatusCode,error.message).send(res)
}
