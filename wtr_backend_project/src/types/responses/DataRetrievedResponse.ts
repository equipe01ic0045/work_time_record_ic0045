import BaseApiResponse from "./BaseApiResponse";

export default class DataRetrievedResponse extends BaseApiResponse {
  constructor() {
    super(200, true, "Data retrieved successfully.");
  }
}
