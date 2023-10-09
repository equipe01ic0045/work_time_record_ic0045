import ProjectListData from "@/types/ProjectListData";
import { AxiosResponse } from "axios";
import axios from "./axios";
import ProjectInfo from "@/types/ProjectInfo";

export interface newProjectData {
  project_name: string;
}

export default class ProjectService {
  public async getUserProjects() {
    const result = await axios.get("projects");
    const projects: ProjectListData[] = result.data.data
    return projects;
  }

  public async getProjectInfo(projectId:number){
    const result = await axios.get("projects/"+projectId)
    return result.data.data as ProjectInfo
  }

  public async createNewProject(data: newProjectData): Promise<AxiosResponse> {
    return axios.post("projects", data);
  }
}
