import BaseError from "./abstract/BaseError";

export default class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`${resource} not found.`);
    this.httpStatusCode = 404
  }
}
