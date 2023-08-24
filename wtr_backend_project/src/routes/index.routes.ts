import { ProjectRoutesWrapper } from './projects.routes'
import { UserRoutesWrapper } from './users.routes'

export const init =  (controllers) => ({
    projectRouter: new ProjectRouterWrapper(controllers.projectController),
    userRouter: new UserRouterWrapper(controllers.userController)
    timeRecordsRouter: new TimeRecordsWrapper(controllers.timeRecordsController),
})