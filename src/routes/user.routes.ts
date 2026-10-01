import { Router } from 'express'
import { asyncHandler } from '../utils/async-handler.js'
import { UserController } from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.get("/users", UserController.GetAllUserController)
userRouter.post("/users", UserController.CreateUser)
