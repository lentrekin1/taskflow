"use client";

import { createTaskAction } from "@/app/actions/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTask({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  
  async function onSubmit(formData: FormData) {
    const result = await createTaskAction({ projectId, formData });
    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary inline-flex items-center"
      >
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm z-50">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                <form action={onSubmit}>
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
                  </div>
                  
                  <div className="px-6 py-4">
                    {error && (
                      <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          required
                          minLength={3}
                          maxLength={100}
                          className="input"
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          maxLength={1000}
                          rows={3}
                          className="input"
                          placeholder="Enter task description"
                        />
                      </div>
                      <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date
                        </label>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          min={new Date().toISOString().split("T")[0]}
                          className="input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 