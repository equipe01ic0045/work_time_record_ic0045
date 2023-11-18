import ProjectListData from "@/types/ProjectListData";
import { AxiosResponse } from "axios";
import axios from "./axios";
import ProjectUsers from "@/types/ProjectUsers";
import ProjectInfo from "@/types/ProjectInfo";

export interface registerProject {
  projectName?: string;
  projectDescription?: string;
  locationRequired?: boolean;
  commercialTimeRequired?: boolean;
  timezone?: string;
  location?: String;
  commercialTimeStart?: number | string;
  commercialTimeEnd?: number | string;
}

export interface editProject {
  projectId?: number;
  projectName?: string;
  projectDescription?: string;
  locationRequired?: boolean;
  commercialTimeRequired?: boolean;
  timezone?: string;
  location?: String;
  commercialTimeStart?: number;
  commercialTimeEnd?: number;
}

export interface deleteProject {
  projectId?: string;
}

export interface addUserProject {
  userId?: number;
  userEmail?: string;
  userRole?: string;
  userHoursPerWeek?: number;
}

export default class ProjectService {
  public async getUserProjects() {
    const result = await axios.get("projects");
    const projects: ProjectListData[] = result.data.data;
    return projects;
  }

  public async getProjectInfo(projectId: number) {
    const result = await axios.get("projects/" + projectId);
    return result.data.data as ProjectInfo;
  }

  public async getProjectUsers(projectId: number) {
    const result = await axios.get("projects/" + projectId + "/users");
    return result.data.data as ProjectUsers[];
  }

  public async postProjectUsers(projectId: string, user: addUserProject) {
    const addUserData = {
      user_id: user.userId,
      user_email: user.userEmail,
      user_role: user.userRole,
      user_hours_per_week: Number(user.userHoursPerWeek),
    };
    const { data } = await axios.post(
      "projects/" + projectId + "/users",
      addUserData
    );
    return data;
  }

  public async putProjectUsers(
    projectId: number,
    user_email: string,
    user_role: string,
    user_hours_per_week: number
  ) {
    const { data } = await axios.put("projects/" + projectId + "/users", {
      user_email: user_email,
      user_role: user_role,
      user_hours_per_week: user_hours_per_week,
    });
    return data;
  }

  public async createProject(
    createProject: registerProject
  ): Promise<AxiosResponse> {
    const createProjectData = {
      project_name: createProject.projectName,
      location_required: createProject.locationRequired,
      commercial_time_required: createProject.commercialTimeRequired,
      timezone: createProject.timezone,
      location: createProject.location,
      commercial_time_start: this.timeStringHandler(createProject.commercialTimeStart),
      commercial_time_end: this.timeStringHandler(createProject.commercialTimeEnd),
      project_description: createProject.projectDescription,
    };
    return axios.post("/projects", createProjectData, {
      withCredentials: true,
    });
  }

  public async updateProject(editProject: editProject) {
    const editProjectData = {
      project_id: editProject.projectId,
      project_name: editProject.projectName,
      project_description: editProject.projectDescription,
      location_required: editProject.locationRequired,
      commercial_time_required: editProject.commercialTimeRequired,
      timezone: editProject.timezone,
      location: editProject.location,
      commercial_time_start: this.timeStringHandler(editProject.commercialTimeStart),
      commercial_time_end: this.timeStringHandler(editProject.commercialTimeEnd),
    };

    return axios.put("/projects", editProjectData, { withCredentials: true });
  }

  public async deleteProject(projectId: number) {
    return axios.delete("/projects", {
      data: {
        project_id: projectId,
      },
      withCredentials: true,
    });
  }

  public deleteUserInProject(projectId: number, userId: number) {
    return axios.delete(`/projects/${projectId}/${userId}`, {
      withCredentials: true,
    });
  }

  public timeStringHandler(value: string | any) {
    const newValue = value.slice(0, 2)
    if (newValue[0] === '0') {
      return Number(newValue[1])*60
    }
    else {
      return Number(newValue)*60
    }

  }

}
