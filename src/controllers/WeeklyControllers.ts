import { Request, Response } from "express";
import { weeklySubmissionServices } from "../services/WeeklyServices.js";
import ResponseWork from "../utils/utilityResponse/Response.js";


export const WeeklyControllers = {


async GetAllSumbissions(req:Request, res:Response){

try {

// const incomingData = req.body
const search = req.query.search as string


const WeeklyData = await weeklySubmissionServices.GetAllSubmissions(search)

ResponseWork.SuccessResponse(201,
    "Data fetched Successfully",
    WeeklyData,
    res
)

} catch (error:any){

console.log(error)

    ResponseWork.FailureResponse(500,
        "Failed to load response",
        error.message,
        res,
    )
}

},

async CreateSubmissions(req:Request, res:Response){
    
try {

const incomingData = req.body

// console.log(`IncomingData is`, incomingData)

const Deliverables = await weeklySubmissionServices.CreateWeeklySubmissions(incomingData)

ResponseWork.SuccessResponse(201,
    "Deliverables sent Successfully",
    Deliverables,
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






}