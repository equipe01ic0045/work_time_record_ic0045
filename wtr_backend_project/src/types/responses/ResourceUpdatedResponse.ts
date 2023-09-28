import BaseApiResponse from "./BaseApiResponse";

export default class ResourceUpdatedResponse extends BaseApiResponse {
  constructor() {
    super(200, true, "Resource Updated.");
  }
}
