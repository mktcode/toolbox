"use client";

import {
  ArrowTopRightOnSquareIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { type Template } from "@prisma/client";
import Link from "next/link";

export default function PublicTemplates({
  templates,
}: {
  templates: Template[];
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">{template.name}</h2>
            <div className="flex rounded-md px-2 py-1">
              <span className="text-sm text-gray-400">24</span>
              <HeartIcon className="ml-1 h-5 w-5 text-gray-300" />
            </div>
          </div>
          <p className="mb-4 px-4 text-base text-gray-500">
            {template.description}
          </p>
          <div className="mt-auto flex items-center justify-between space-x-2 bg-gray-50 p-2">
            <Link
              className="button grow"
              href={`/templates/${template.id}`}
              target="_blank"
            >
              <span className="pr-1">Open</span>
              <ArrowTopRightOnSquareIcon className="ml-auto h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
