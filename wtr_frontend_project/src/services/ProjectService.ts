import ProjectListData from "@/types/ProjectListData";
import { AxiosResponse } from "axios";
import axios from "./axios";
import ProjectUsers from "@/types/ProjectUsers";
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

  public async getProjectUsers(projectId:number){
    const result = await axios.get("projects/"+projectId+"/users")
    return result.data.data as ProjectUsers[]
  }

  public async postProjectUsers(projectId:number, user_email: string, user_role: string, user_hours_per_week: number){
    const { data } = await axios.post("projects/"+projectId+"/users",
      {
        user_email: user_email,
        user_role: user_role,
        user_hours_per_week: user_hours_per_week
      }
    )
    return data
  }

  public async createNewProject(data: newProjectData): Promise<AxiosResponse> {
    return axios.post("projects", data);
  }
}
