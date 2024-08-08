'use client';

import { api } from "~/trpc/react";

export default function ProjectSelect() {
    const [projects] = api.project.getAll.useSuspenseQuery();

    return (
        <select className="rounded-md px-3 py-1 ml-8 font-semibold text-xl bg-white">
            <option>Select project</option>
            {projects?.map((project) => (
                <option key={project.id}>{project.name}</option>
            ))}
        </select>
    )
}