import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

export const AuthRoutes = Router()

AuthRoutes.post("/authenticate", AuthController.Login)