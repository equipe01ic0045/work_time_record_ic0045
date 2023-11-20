import axios from "./axios";

export default class JustificationService {
  static async getDocument(project_id: number, justification_id: number) {
    const response = await axios.get(
      `/projects/justification/${project_id}/record/${justification_id}/document`,
      {
        responseType: "arraybuffer",
      }
    );

    return new Blob([response.data], {
      type: "application/octet-stream",
    });
  }

  static async getJustificationListData(
    project_id: number,
    status: string = "PENDING"
  ) {
    const response = await axios.get(
      `/projects/justification/${project_id}?status=${status}`
    );
    return response.data.data;
  }

  static async getJustificationData(
    project_id: number,
    justification_id: number
  ) {
    const response = await axios.get(
      `/projects/justification/${project_id}/record/${justification_id}`
    );
    return response.data.data;
  }

  static async sendReviewData(
    project_id: number,
    justification_id: number,
    data: { status: string; reviewer_message: string }
  ) {
    const response = await axios.post(
      `/projects/justification/${project_id}/record/${justification_id}/review`,data
    );
    console.log(response)
    return response
  }
}
