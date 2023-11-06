import { Router } from "express";
import authorize from "../middlewares/authorize";
import AuthRoutes from "./AuthRoutes";
import ProjectRoutes from "./ProjectRoutes";
import TimeRecordRoutes from "./TimeRecordRoutes";
import ProfileRoutes from "./ProfileRoutes";
const router = Router();

router.use("/auth", new AuthRoutes().router);
router.use("/projects", authorize, new ProjectRoutes().router);
router.use("/projects/time-records", authorize, new TimeRecordRoutes().router);
router.use("/profiles", authorize, new ProfileRoutes().router);
export default router;
