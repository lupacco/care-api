import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";
import appointmentsController from "../controllers/appointmentsController.js";

const appointmentsRouter = Router()

appointmentsRouter.post("/appointments", validateSchema(appointmentSchema), appointmentsController.create)

export default appointmentsRouter