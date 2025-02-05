import { prisma } from "@/lib/db";

export async function getProjectsForUser(userId: string) {
  return prisma.project.findMany({
    where: {
      users: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      users: true,
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function createProject(data: {
  name: string;
  description?: string;
  createdBy: string;
}) {
  return prisma.project.create({
    data: {
      ...data,
      users: {
        create: {
          userId: data.createdBy,
          role: "OWNER",
        },
      },
    },
    include: {
      users: true,
    },
  });
} 