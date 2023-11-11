import AuthService from "./AuthService";
import JustificationService from "./JustificationService";
import ProjectService from "./ProjectService";
import TimeRecordService from "./TimeRecordService";

export const authService = new AuthService();
export const projectService = new ProjectService();
export const timeRecordService = new TimeRecordService();
export const justificationService = new JustificationService();

