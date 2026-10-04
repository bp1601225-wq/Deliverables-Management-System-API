import { Request, Response } from "express";
import ResponseWork from "../utils/utilityResponse/Response.js";
import { Dashboardservice } from "../services/DashbordService.js";

export const DashboardController = async (req:Request, res:Response) => {

try {

    const DashboardData = await Dashboardservice()

    ResponseWork.SuccessResponse(200, 
        "KPI loaded Succesfully",
        DashboardData,
        res
    )

} catch (error:any){
    console.log(error)

    ResponseWork.FailureResponse(500,
        error.message,
        res
    )
}


}