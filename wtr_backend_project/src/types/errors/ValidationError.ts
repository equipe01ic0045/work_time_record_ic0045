import BaseError from "./abstract/BaseError";

export default class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    this.httpStatusCode = 400
  }
}
