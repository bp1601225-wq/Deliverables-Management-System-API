import { Request, Response } from "express";
import { weeklySubmissionServices } from "../services/WeeklyServices.js";
import ResponseWork from "../utils/utilityResponse/Response.js";


export const WeeklyControllers = {


async GetAllSumbissions(req: Request, res: Response) {
  try {
    const search = req.query.search as string;
    const thisWeek = req.query.thisWeek as string;

    const WeeklyData =
      await weeklySubmissionServices.GetAllSubmissions(
        search,
        thisWeek
      );

    ResponseWork.SuccessResponse(
      200,
      "Data fetched Successfully",
      WeeklyData,
      res
    );
  } catch (error: any) {
    console.log(error);

    ResponseWork.FailureResponse(
      500,
      "Failed to load response",
      error.message,
      res
    );
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
},

async CreateCommentsController (req:Request, res:Response){
try {

    const incomingData = req.body

    console.log(`Incoming data is`, incomingData)

    const outgoingData = await weeklySubmissionServices.CreateComment(incomingData)

ResponseWork.SuccessResponse(200,
    "Comments added succesfully",
    outgoingData,
    res
)

} catch (error:any){
    console.log(error)
    ResponseWork.FailureResponse(500,
        error.message,
        res
    )
}
},

async GetCommentsById(req:Request, res:Response){
    try {
        
        const id = req.params.id as string
const responseData = await weeklySubmissionServices.GetCommentsById(id)

ResponseWork.SuccessResponse(201,
"Comments loaded successfully",
responseData,
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