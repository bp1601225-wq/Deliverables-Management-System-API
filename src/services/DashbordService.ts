import { prisma } from "../config/prisma.js";

export const Dashboardservice = async () => {

 const [
  totalDeliverables,
  reviewedDeliverables,
  haveReachedDueDate,
  havePassedDueDate,
  pendingReviews,
] = await Promise.all([

  prisma.deliverable.count(),

  prisma.deliverable.count({
    where: {
      status: "REVIEWED",
    },
  }),

  prisma.deliverable.count({
    where: {
      dueDate: {
        lte: new Date(),
      },
    },
  }),

  prisma.deliverable.count({
    where: {
      dueDate: {
        lt: new Date(),
      },
      status: "SUBMITTED",
    },
  }),

  prisma.deliverable.count({
    where: {
      status: "SUBMITTED",
    },
  }),
]);

  const completionRate =  totalDeliverables > 0
    ? Math.round(
        (reviewedDeliverables / totalDeliverables) * 100
      )
    : 0;

  return {
    totalDeliverables,
    haveReachedDueDate,
    havePassedDueDate,
    pendingReviews,
    completionRate

  };
};