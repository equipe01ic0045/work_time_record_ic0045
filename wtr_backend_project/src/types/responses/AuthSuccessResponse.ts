import BaseApiResponse from "./abstract/BaseApiResponse";

export default class AuthSuccessResponse extends BaseApiResponse {
  constructor() {
    super(200, true, "Authentication Successful.");
  }
}
