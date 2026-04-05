import express from "express";
import { createAttendance } from "../controllers/AttendanceController";

const router = express.Router();

router.post("/api/attendances", createAttendance);

export { router };