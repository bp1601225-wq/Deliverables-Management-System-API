import { WeeklySubmission } from '@prisma/client'
import { prisma } from '../config/prisma.js'
import dayjs from 'dayjs'
import isoweek from "dayjs/plugin/isoWeek.js"

export const weeklySubmissionServices = {
async GetAllSubmissions(search?: string, thisWeek?: string) {
  const searchTerm = search?.trim();

  dayjs.extend(isoweek);

  const weekStart = dayjs().startOf("isoWeek").toDate();




  return prisma.weeklySubmission.findMany({
    where: {
      ...(thisWeek === "true" && {
        weekStart: weekStart,
      }),

      OR: searchTerm
        ? [
            {
              user: {
                is: {
                  name: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              user: {
                is: {
                  email: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              user: {
                is: {
                  phone: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            },
          ]
          
        : undefined,
    },

    select: {
      id: true,
      weekStart: true,
      weekEnd: true,
      status: true,
      supportNeeded: true,
      rating: true,
      submittedAt: true,
      reviewedAt: true,

      deliverables: {
        select: {
          title: true,
          verificationMethod: true,
          dueDate: true,
          status: true,
        },
      },

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,

          unit: {
            select: {
              name: true,
            },
          },
        },
      },

      comments: {
        select: {
          comment: true,
          createdAt: true,
        },
      },
    },
  });
},

async CreateWeeklySubmissions(submissions: any) {
  // 1. Check userId
  if (!submissions.userId) {
    throw new Error("User ID is required");
  }

  // 2. Automatically calculate Monday - Friday
  const weekStart = dayjs().startOf("week").add(1, "day");
  const weekEnd = weekStart.add(4, "day");

  // 3. Check deliverables
  if (!Array.isArray(submissions.deliverables)) {
    throw new Error("Deliverables must be an array");
  }

  if (submissions.deliverables.length === 0) {
    throw new Error("At least one deliverable is required");
  }

  if (submissions.deliverables.length > 5) {
    throw new Error("You can only add a maximum of 5 deliverables");
  }

  // 4. Validate each deliverable
  for (const item of submissions.deliverables) {
    if (!item.title?.trim()) {
      throw new Error("Deliverable title is required");
    }

    if (!item.verificationMethod?.trim()) {
      throw new Error("Verification method is required");
    }

    if (!item.dueDate) {
      throw new Error("Deliverable due date is required");
    }

    const dueDate = new Date(item.dueDate);

    if (isNaN(dueDate.getTime())) {
      throw new Error("Invalid deliverable due date");
    }



if (dueDate < weekStart.toDate()) {
  throw new Error(
    "Deliverable due date cannot be before the submission week"
  );
}
  }


const existingSubmission =
  await prisma.weeklySubmission.findUnique({
    where: {
      userId_weekStart: {
        userId: submissions.userId,
        weekStart: weekStart.toDate(),
      },
    },
  });

if (existingSubmission) {
  throw new Error(
    "You have already submitted your deliverables for this week."
  );
}

  // 5. Create submission
  return prisma.weeklySubmission.create({
    data: {
      userId: submissions.userId,

      weekStart: weekStart.toDate(),
      weekEnd: weekEnd.toDate(),

      supportNeeded: submissions.supportNeeded,

      // status:"DRAFT",

      deliverables: {
        create: submissions.deliverables.map((item: any) => ({
          title: item.title.trim(),
          verificationMethod: item.verificationMethod.trim(),
          dueDate: new Date(item.dueDate),
          status: "SUBMITTED"
        })),
      },
    },

    include: {
      deliverables: true,
    },
  });
},


async CreateComment(data: any) {
  return prisma.$transaction(async (tx) => {

    const submission = await tx.weeklySubmission.findUnique({
      where: {
        id: data.submissionId,
      },
      include: {
        deliverables: true,
      },
    });

    if (!submission) {
      throw new Error("No record exists");
    }

    // Create manager comment
    const comment = await tx.submissionComment.create({
      data: {
        submissionId: data.submissionId,
        comment: data.comment,
      },
    });

    // Update every deliverable belonging to this submission
    await tx.deliverable.updateMany({
      where: {
          weeklySubmissionId: data.submissionId,
      },
      data: {
        status: "REVIEWED",
      },
    });

    // Mark the whole weekly submission as reviewed
    await tx.weeklySubmission.update({
      where: {
        id: data.submissionId,
      },
      data: {
        status: "REVIEWED",
        reviewedAt: new Date(),
      },
    });

    return comment;
  });
},

async GetCommentsById(id:string){

  return prisma.weeklySubmission.findUnique({
    where:{
      id
    }, 

    select:{
      comments:true
    }

  })


}















// async UpdateDeliverable(
//   deliverableId: string,
//   data: {
//     title?: string;
//     verificationMethod?: string;
//     dueDate?: Date;
//     status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";
//   }
// ) {
//   const deliverable = await prisma.deliverable.findUnique({
//     where: {
//       id: deliverableId,
//     },
//     include: {
//       weeklySubmission: true,
//     },
//   });

//   if (!deliverable) {
//     throw new Error("Deliverable not found");
//   }

//   if (deliverable.weeklySubmission.status !== "DRAFT") {
//     throw new Error(
//       "You can only edit deliverables in a draft submission"
//     );
//   }

//   return prisma.deliverable.update({
//     where: {
//       id: deliverableId,
//     },
//     data: {
//       ...(data.title !== undefined && {
//         title: data.title.trim(),
//       }),

//       ...(data.verificationMethod !== undefined && {
//         verificationMethod: data.verificationMethod.trim(),
//       }),

//       ...(data.dueDate !== undefined && {
//         dueDate: data.dueDate,
//       }),

//       ...(data.status !== undefined && {
//         status: data.status,
//       }),
//     },
//   });
// }

}