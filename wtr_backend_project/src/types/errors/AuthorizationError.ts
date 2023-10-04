import BaseError from "./abstract/BaseError";

export default class AuthorizationError extends BaseError {
  constructor() {
    super('not authorized.');
    this.httpStatusCode = 401
  }
}
