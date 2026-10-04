import { Router } from "express";
import { WeeklyControllers } from "../controllers/WeeklyControllers.js";

export const WeeklyRouter = Router()


WeeklyRouter.get("/weekly-submissions", WeeklyControllers.GetAllSumbissions)


WeeklyRouter.get("/comments-by-id/:id",WeeklyControllers.GetCommentsById)



WeeklyRouter.post("/post-weekly-submissions", WeeklyControllers.CreateSubmissions)
WeeklyRouter.post("/post-weekly-submissions-comment", WeeklyControllers.CreateCommentsController)