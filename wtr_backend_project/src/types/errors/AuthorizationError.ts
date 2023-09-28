import BaseError from "./BaseError";

export default class AuthorizationError extends BaseError {
  constructor() {
    super('not authorized.');
    this.httpStatusCode = 401
  }
}
