import { Request, Response } from "express";
import { organizationServices } from "../services/OrganizationService.js";
import ResponseWork from "../utils/utilityResponse/Response.js";

export const OrganizationControllers = {

  async GetAllUnits(req: Request, res: Response) {
    try {

      const Units = await organizationServices.GetAllUnits();

      ResponseWork.SuccessResponse(
        200,
        "Units fetched successfully",
        Units,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to load units",
        error.message
      );
    }
  },

  async CreateUnit(req: Request, res: Response) {
    try {

      const incomingData = req.body;

      const Unit = await organizationServices.CreateUnit(
        incomingData
      );

      ResponseWork.SuccessResponse(
        201,
        "Unit created successfully",
        Unit,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to create unit",
        error.message
      );
    }
  },

  async UpdateUnit(req: Request, res: Response) {
    try {

      const incomingData = req.body;
      const unitId = req.params.id as string;

      const Unit = await organizationServices.UpdateUnit(
        unitId,
        incomingData
      );

      ResponseWork.SuccessResponse(
        200,
        "Unit updated successfully",
        Unit,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to update unit",
        error.message
      );
    }
  },

  async DeleteUnit(req: Request, res: Response) {
    try {

      const unitId = req.params.id as string;

      const Unit = await organizationServices.DeleteUnit(
        unitId
      );

      ResponseWork.SuccessResponse(
        200,
        "Unit deleted successfully",
        Unit,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to delete unit",
        error.message
      );
    }
  },

  async GetAllPositions(req: Request, res: Response) {
    try {

      const Positions =
        await organizationServices.GetAllPositions();

      ResponseWork.SuccessResponse(
        200,
        "Positions fetched successfully",
        Positions,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to load positions",
        error.message
      );
    }
  },

  async CreatePosition(req: Request, res: Response) {
    try {

      const incomingData = req.body;

      const Position =
        await organizationServices.CreatePosition(
          incomingData
        );

      ResponseWork.SuccessResponse(
        201,
        "Position created successfully",
        Position,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to create position",
        error.message
      );
    }
  },

  async UpdatePosition(req: Request, res: Response) {
    try {

      const incomingData = req.body;
      const positionId = req.params.id as string;

      const Position =
        await organizationServices.UpdatePosition(
          positionId,
          incomingData
        );

      ResponseWork.SuccessResponse(
        200,
        "Position updated successfully",
        Position,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to update position",
        error.message
      );
    }
  },

  async DeletePosition(req: Request, res: Response) {
    try {

      const positionId = req.params.id as string;

      const Position =
        await organizationServices.DeletePosition(
          positionId
        );

      ResponseWork.SuccessResponse(
        200,
        "Position deleted successfully",
        Position,
        res
      );

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "Failed to delete position",
        error.message
      );
    }
  },
};