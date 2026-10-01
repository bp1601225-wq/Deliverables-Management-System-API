import { prisma } from '../config/prisma.js'
// import argon2 from "argon2"
import argon2 from "argon2";


export const UserService = {

async GetAllUsers(search?:string){
  return prisma.user.findMany({
    where:{
      ...(search && {
        OR:[
          {
            name:{
              contains:search
            },
            email:{
              contains:search
            },
            phone:{
              contains:search
            }
          }
        ] 
      })
    },


    select:{
      id:true,
      name:true,
      email:true,
      phone:true,
      role:true,
      
      unit:{
        select:{
          id:true,
          name:true,
          description:true
        }
      },

      position:{
        select:{
          name:true,
          description:true
        }
      }
      

    }
  })
},


    async CreateUsers(data: any) {

        // 1. Check email
        const isEmailFound = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (isEmailFound) {
            throw new Error("Email already exists");
        }

        // 2. Check phone
        const isPhoneFound = await prisma.user.findUnique({
            where: {
                phone: data.phone,
            },
        });

        if (isPhoneFound) {
            throw new Error(
                "This phone number already exists, choose a different one"
            );
        }

        // 3. Hash password
        const hashedPassword = await argon2.hash(data.password);

        // 4. Create user
        const createdUser = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

        // 5. Don't return password
        const { password, ...userWithoutPassword } = createdUser;

        return userWithoutPassword;
    },
};
