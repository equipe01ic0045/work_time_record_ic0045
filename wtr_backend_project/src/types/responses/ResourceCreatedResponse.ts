import BaseApiResponse from "./BaseApiResponse";

export default class ResourceCreatedResponse extends BaseApiResponse {
  constructor() {
    super(201, true, "Resource Created.");
  }
}
