import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const AuthService = {

async Login(data: any) {

// 1. Find user by email
const isFoundUser = await prisma.user.findUnique({
where: {
email: data.email
}
});

// 2. If user does not exist
if (!isFoundUser) {
throw new Error("The email you typed does not exists");
}

// 3. Compare password
const isPasswordCorrect = await argon2.verify(
isFoundUser.password,
data.password
);

// 4. If password is wrong
if (!isPasswordCorrect) {
throw new Error("The password you typed is not correct");
}

// 5. Create JWT
const token = jwt.sign(
{
id: isFoundUser.id,
email: isFoundUser.email,
role: isFoundUser.role
},
process.env.JWT_SECRET!,
{
expiresIn: "1d"
}
);

// 6. Return token + user
return {
token,
sucess:true,


user: {
id: isFoundUser.id,
name: isFoundUser.name,
email: isFoundUser.email,
role: isFoundUser.role,
}
};
}
};