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
}
