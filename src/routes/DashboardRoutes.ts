import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController.js";

export const DashboardRouter = Router()

DashboardRouter.get("/dashboard", DashboardController)