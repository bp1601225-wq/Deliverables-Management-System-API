import { prisma } from '../config/prisma.js'

export type CreateUserInput = {
  name: string
  email: string
}

export function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export function createUser(input: CreateUserInput) {
  return prisma.user.create({
    data: input,
  })
}
