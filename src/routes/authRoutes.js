import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";
import userController from "../controllers/userController";

const authRouter = Router()

authRouter.post('/signup', validateSchema(userSchema), userController.create)

export default authRouter