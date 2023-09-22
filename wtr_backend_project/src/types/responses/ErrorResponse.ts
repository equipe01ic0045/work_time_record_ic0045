import BaseApiResponse from "./abstract/BaseApiResponse";

export default class ErrorResponse extends BaseApiResponse {
  constructor(status:number=500,message:string="Internal Server Error.") {
    super(status, false, message);
  }
}