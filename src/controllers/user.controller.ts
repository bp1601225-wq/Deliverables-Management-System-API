import type { Request, Response } from 'express'
import ResponseWork from '../utils/utilityResponse/Response.js'
import { UserService } from '../services/user.service.js'

export const UserController = {

async GetAllUserController(req:Request, res:Response){


  try {

    const search = req.query.search as string

    const outgoingData = await UserService.GetAllUsers(search)

    ResponseWork.SuccessResponse(200, 
      "User Fetched Succesfully",
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

async CreateUser(req:Request, res:Response) {
  try {

    const incomingData = req.body

    console.log(incomingData)

    const FinalData = await UserService.CreateUsers(incomingData)

    ResponseWork.SuccessResponse(201,
      "User Created Succesfully",
      FinalData,
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