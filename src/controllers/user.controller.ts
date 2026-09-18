import type { Request, Response } from 'express'
import { createUser, getUsers } from '../services/user.service.js'

export async function listUsers(_request: Request, response: Response) {
  const users = await getUsers()

  response.json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  })
}

export async function storeUser(request: Request, response: Response) {
  const { name, email } = request.body as { name?: unknown; email?: unknown }

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof email !== 'string' ||
    email.trim().length === 0
  ) {
    response.status(400).json({
      success: false,
      message: 'Name and email are required',
    })
    return
  }

  const user = await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
  })

  response.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user,
  })
}
