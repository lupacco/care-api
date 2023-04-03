import { Router } from "express";
import doctorController from "../controllers/doctorController.js";

const doctorsRouter = Router();

doctorsRouter.get("/doctors/name", doctorController.findByName);
doctorsRouter.get("/doctors/speciality", doctorController.findBySpeciality);

export default doctorsRouter;
