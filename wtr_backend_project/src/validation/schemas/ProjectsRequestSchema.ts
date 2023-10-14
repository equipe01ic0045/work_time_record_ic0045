import { checkSchema } from "express-validator";
import { ProjectValidator } from "../customValidadors/ProjectValidator";

const {
    isAbleToModifyProject,
    isMemberOfTheProject,
    isValidProjectName
} =  ProjectValidator.getInstance()

export const CreateProjectRequestSchema = checkSchema({
    project_name: {
        notEmpty: true,
        custom:{
            bail: true, 
            options: isValidProjectName, 
        },
    }
})

