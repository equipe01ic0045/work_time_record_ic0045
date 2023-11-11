import UserService from "./UserService";
import JustificationService from "./JustificationService";
import ProjectService from "./ProjectService";
import TimeRecordService from "./TimeRecordService";

export const userService = new UserService();
export const projectService = new ProjectService();
export const timeRecordService = new TimeRecordService();
export const justificationService = new JustificationService();

