import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import userController from "../controllers/userController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema),  userController.create);


export default authRouter;