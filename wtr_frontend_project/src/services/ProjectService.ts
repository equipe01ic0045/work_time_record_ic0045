import axios, { AxiosResponse } from "axios";

export interface newProjectData{
    project_name: string
}

export default class ProjectService {
  public async getUserProjects() : Promise<AxiosResponse> {
    return axios.get("projects");
  }

  public async createNewProject(data:newProjectData):Promise<AxiosResponse>{
    return axios.post("projects",data)
  }

  
}
