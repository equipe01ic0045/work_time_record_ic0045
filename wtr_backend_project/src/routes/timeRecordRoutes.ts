import { Router } from "express";
import authorize from "../middlewares/authorize";
import TimeRecordController from "../controllers/TimeRecordController";

const router = Router();

const timeRecordController = new TimeRecordController();
router.post(
  "/checkIn",
  authorize,
  timeRecordController.checkInTimeRecord
);
router.put(
  "/checkOut",
  authorize,
  timeRecordController.checkOutTimeRecord
);

export default router;
