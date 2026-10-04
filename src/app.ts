import "dotenv/config";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { userRouter } from "./routes/user.routes.js";
import { WeeklyRouter } from "./routes/WeeklyRoutes.js";
import { OrganizationRouter } from "./routes/organizationRoutes.js";
import { AuthRoutes } from "./routes/AuthRoutes.js";
import { DashboardRouter } from "./routes/DashboardRoutes.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    success: true,
    message: "API is healthy",
  });
});

app.use(userRouter);
app.use(WeeklyRouter);
app.use(OrganizationRouter)
app.use(AuthRoutes)
app.use(DashboardRouter)

app.use(errorHandler);