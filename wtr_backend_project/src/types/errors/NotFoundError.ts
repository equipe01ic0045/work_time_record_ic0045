import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`${resource} not found.`);
    this.httpStatusCode = 404
  }
}
