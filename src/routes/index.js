import { Router } from "express";
import authRouter from "./authRoutes.js";
import doctorsRouter from "./doctorsRoutes.js";

const routes = Router();

routes.use([authRouter, doctorsRouter]);

export default routes;
