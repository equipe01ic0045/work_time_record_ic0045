import BaseError from "./abstract/BaseError";

export default class ConflictError extends BaseError {
  constructor(resource: string) {
    super(`${resource} already exists.`);
    this.httpStatusCode = 409
  }
}
