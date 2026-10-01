import { Router } from "express";
import { WeeklyControllers } from "../controllers/WeeklyControllers.js";

export const WeeklyRouter = Router()


WeeklyRouter.get("/weekly-submissions", WeeklyControllers.GetAllSumbissions)
WeeklyRouter.post("/post-weekly-submissions", WeeklyControllers.CreateSubmissions)

