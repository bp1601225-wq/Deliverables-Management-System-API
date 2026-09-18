import { Router } from 'express'
import { listUsers, storeUser } from '../controllers/user.controller.js'
import { asyncHandler } from '../utils/async-handler.js'

export const userRouter = Router()

userRouter.get('/', asyncHandler(listUsers))
userRouter.post('/', asyncHandler(storeUser))
