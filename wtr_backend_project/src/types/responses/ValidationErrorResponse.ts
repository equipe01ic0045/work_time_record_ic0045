import BaseApiResponse from "./abstract/BaseApiResponse";

export default class ValidationErrorResponse extends BaseApiResponse {
  constructor() {
    super(400, false, "Bad Input Data.");
  }
}
