"use client";

import { createProjectAction } from "@/app/actions/projects";
import { useState } from "react";

export default function CreateProject() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  
  async function onSubmit(formData: FormData) {
    setError(undefined); // Clear previous errors
    const result = await createProjectAction(formData);
    if (result.success) {
      setOpen(false);
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
        New Project
      </button>

      {open && (
        <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm z-50">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  await onSubmit(new FormData(e.currentTarget));
                }} role="form">
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
                  </div>

                  <div className="px-6 py-4">
                    {error && (
                      <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          minLength={3}
                          maxLength={50}
                          placeholder="Enter project name"
                          className="input"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          maxLength={500}
                          placeholder="Enter project description"
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
                      Create Project
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