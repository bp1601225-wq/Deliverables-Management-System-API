import { prisma } from "../config/prisma.js";

export const organizationServices = {
  async GetAllUnits() {
    return prisma.unit.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async CreateUnit(data: any) {
    if (!data.name?.trim()) {
      throw new Error("Unit name is required");
    }

    return prisma.unit.create({
      data: {
        name: data.name.trim(),
        description: data.description?.trim(),
      },
    });
  },

  async UpdateUnit(unitId: string, data: any) {
    const unit = await prisma.unit.findUnique({
      where: {
        id: unitId,
      },
    });

    if (!unit) {
      throw new Error("Unit not found");
    }

    if (data.name !== undefined && !data.name.trim()) {
      throw new Error("Unit name is required");
    }

    return prisma.unit.update({
      where: {
        id: unitId,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name.trim(),
        }),

        ...(data.description !== undefined && {
          description: data.description.trim(),
        }),
      },
    });
  },

  async DeleteUnit(unitId: string) {
    const unit = await prisma.unit.findUnique({
      where: {
        id: unitId,
      },
    });

    if (!unit) {
      throw new Error("Unit not found");
    }

    const users = await prisma.user.count({
      where: {
        unitId,
      },
    });

    if (users > 0) {
      throw new Error(
        "Cannot delete this unit because users are assigned to it"
      );
    }

    return prisma.unit.delete({
      where: {
        id: unitId,
      },
    });
  },

  async GetAllPositions() {
    return prisma.position.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async CreatePosition(data: any) {
    if (!data.name?.trim()) {
      throw new Error("Position name is required");
    }

    return prisma.position.create({
      data: {
        name: data.name.trim(),
        description: data.description?.trim(),
      },
    });
  },

  async UpdatePosition(positionId: string, data: any) {
    const position = await prisma.position.findUnique({
      where: {
        id: positionId,
      },
    });

    if (!position) {
      throw new Error("Position not found");
    }

    if (data.name !== undefined && !data.name.trim()) {
      throw new Error("Position name is required");
    }

    return prisma.position.update({
      where: {
        id: positionId,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name.trim(),
        }),

        ...(data.description !== undefined && {
          description: data.description.trim(),
        }),
      },
    });
  },

  async DeletePosition(positionId: string) {
    const position = await prisma.position.findUnique({
      where: {
        id: positionId,
      },
    });

    if (!position) {
      throw new Error("Position not found");
    }

    const users = await prisma.user.count({
      where: {
        positionId,
      },
    });

    if (users > 0) {
      throw new Error(
        "Cannot delete this position because users are assigned to it"
      );
    }

    return prisma.position.delete({
      where: {
        id: positionId,
      },
    });
  },
};