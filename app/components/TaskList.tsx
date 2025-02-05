"use client";

import { updateTaskStatusAction } from "@/app/actions/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TaskListProps {
  tasks: {
    status: string;
    title: string;
    id: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    dueDate: Date | null;
    projectId: string;
    assignedTo: string | null;
  }[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const router = useRouter();

  async function updateStatus(taskId: string, newStatus: string) {
    try {
      await updateTaskStatusAction(taskId, newStatus);
      router.refresh();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }

  const statusColors = {
    TODO: "bg-gray-50 border-gray-200",
    "IN_PROGRESS": "bg-amber-50 border-amber-200",
    DONE: "bg-emerald-50 border-emerald-200",
  } as const;

  const statusIcons = {
    TODO: (
      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "IN_PROGRESS": (
      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    DONE: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  };

  const filteredTasks = filter === "ALL" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {["ALL", "TODO", "IN_PROGRESS", "DONE"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status 
                ? "bg-indigo-600 text-white" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-lg border p-4 ${statusColors[task.status as keyof typeof statusColors]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {statusIcons[task.status as keyof typeof statusIcons]}
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due: {task.dueDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 