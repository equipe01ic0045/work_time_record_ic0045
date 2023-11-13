import { Router } from "express";
import authorize from "../middlewares/authorize";
import UserRoutes from "./UserRoutes";
import ProjectRoutes from "./ProjectRoutes";
import TimeRecordRoutes from "./TimeRecordRoutes";
import JustificationRoutes from "./JustificationRoutes";
import AuthRoutes from "./AuthRoutes";
const router = Router();

router.use("", new AuthRoutes().router);
router.use("/user", authorize, new UserRoutes().router);
router.use("/projects", authorize, new ProjectRoutes().router);
router.use("/projects/time-records", authorize, new TimeRecordRoutes().router);
router.use("/projects/justification", authorize, new JustificationRoutes().router);
export default router;
