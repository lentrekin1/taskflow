import { getProjectsAction } from "@/app/actions/projects";
import { getTasksAction } from "@/app/actions/tasks";
import CreateTask from "@/app/components/CreateTask";
import TaskList from "@/app/components/TaskList";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function ProjectPage({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const projects = await getProjectsAction();
  const project = projects.find((p) => p.id === params.id);
  if (!project) {
    redirect("/");
  }

  const tasks = await getTasksAction(project.id);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-gray-600 max-w-2xl">{project.description}</p>
            )}
          </div>
          <CreateTask projectId={project.id} />
        </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
} 