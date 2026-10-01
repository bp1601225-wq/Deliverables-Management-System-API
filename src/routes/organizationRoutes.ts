import { Router } from "express";
import { OrganizationControllers } from "../controllers/OrganizationController.js";

export const OrganizationRouter = Router();

OrganizationRouter.get(
  "/get-units",
  OrganizationControllers.GetAllUnits
);

OrganizationRouter.post(
  "/post-unit",
  OrganizationControllers.CreateUnit
);

OrganizationRouter.put(
  "/update-unit/:id",
  OrganizationControllers.UpdateUnit
);

OrganizationRouter.delete(
  "/delete-unit/:id",
  OrganizationControllers.DeleteUnit
);

OrganizationRouter.get(
  "/get-positions",
  OrganizationControllers.GetAllPositions
);

OrganizationRouter.post(
  "/post-position",
  OrganizationControllers.CreatePosition
);

OrganizationRouter.put(
  "/update-position/:id",
  OrganizationControllers.UpdatePosition
);

OrganizationRouter.delete(
  "/delete-position/:id",
  OrganizationControllers.DeletePosition
);