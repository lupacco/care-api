import { Router } from "express";
import authRouter from "./authRoutes.js";

const routes = Router()

routes.use(authRouter)


export default routes