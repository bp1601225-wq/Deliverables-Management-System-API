import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";
import ResponseWork from "../utils/utilityResponse/Response.js";

export const AuthController = {

  async Login(req: Request, res: Response) {

    try {

      const incmoingData = req.body;

      const result = await AuthService.Login(incmoingData);

      res.status(201).json({
        message: "Login Successful",
        success: true,
        data: result
      });

    } catch (error: any) {

      console.log(error);

      ResponseWork.FailureResponse(
        500,
        error.message,
        res
      );
    }
  },

  async Logout() {

  }

};