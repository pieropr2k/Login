/*

import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointments.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAppointmentSchema } from "../schemas/appointment.schema.js";

const router = Router();

router.get("/appointments", auth, getAllAppointments);

router.post("/appointments", auth, validateSchema(createAppointmentSchema), createAppointment);

router.get("/appointments/:id", auth, getAppointmentById);

router.put("/appointments/:id", auth, updateAppointment);

router.delete("/appointments/:id", auth, deleteAppointment);
export default router;
*/