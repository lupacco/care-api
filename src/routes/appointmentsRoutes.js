import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";
import appointmentsController from "../controllers/appointmentsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const appointmentsRouter = Router()

appointmentsRouter.post("/appointments", validateToken, validateSchema(appointmentSchema), appointmentsController.create)
appointmentsRouter.get("/appointments", validateToken, appointmentsController.getFreeAppointments)
appointmentsRouter.patch("/appointments/schedule", validateToken, appointmentsController.schedule)

export default appointmentsRouter