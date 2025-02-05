"use server";

import { createProject, getProjectsForUser } from "@/lib/db/projects";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
});

export async function createProjectAction(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  try {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    const validated = projectSchema.parse(data);
    
    await createProject({
      ...validated,
      createdBy: user.id,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
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

export async function getProjectsAction() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return getProjectsForUser(user.id);
} 