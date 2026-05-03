import express from "express";
import { createAttendance } from "../controllers/AttendanceController";

const router = express.Router();

router.post("/attendances", createAttendance);

export default router;