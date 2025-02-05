"use server";

import { createTask, getTasksForProject, updateTaskStatus } from "@/lib/db/tasks";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  dueDate: z.string().optional(),
});

export async function createTaskAction({ 
  projectId, 
  formData 
}: { 
  projectId: string;
  formData: FormData;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  try {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
    };

    const validated = taskSchema.parse(data);
    
    await createTask({
      ...validated,
      projectId,
      createdBy: user.id,
      dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined,
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to create task:", error);
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message,
        success: false,
      };
    }
    return {
      error: "Something went wrong",
      success: false,
    };
  }
}

export async function getTasksAction(projectId: string) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return getTasksForProject(projectId);
}

export async function updateTaskStatusAction(taskId: string, status: string) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  try {
    const task = await updateTaskStatus(taskId, status);
    revalidatePath(`/projects/${task.projectId}`);
    return task;
  } catch (error) {
    console.error("Failed to update task status:", error);
    throw new Error("Failed to update task status");
  }
} 