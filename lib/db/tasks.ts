import { prisma } from "@/lib/db";

export async function createTask(data: {
  title: string;
  description?: string;
  projectId: string;
  createdBy: string;
  assignedTo?: string;
  dueDate?: Date;
}) {
  return prisma.task.create({
    data: {
      ...data,
      status: "TODO",
    },
  });
}

export async function getTasksForProject(projectId: string) {
  return prisma.task.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateTaskStatus(taskId: string, status: string) {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });
} 