"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function ProjectList() {
  const [projects] = api.project.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createProject = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {projects.map((project) => (
        <div key={project.id} className="p-4 border rounded-md">
          {project.name}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProject.mutate({ name });
        }}
        className="flex flex-col gap-2 mt-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 border"
        />
        <button
          type="submit"
          className="rounded-full bg-gray-200 px-10 py-3 font-semibold transition hover:bg-gray-300"
          disabled={createProject.isPending}
        >
          {createProject.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
