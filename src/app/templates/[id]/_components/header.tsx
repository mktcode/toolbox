"use client";

import { type Session } from "next-auth";
import { PencilIcon } from "@heroicons/react/24/outline";
import { type Template } from "@prisma/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function Header({
  template,
  session,
}: {
  template: Template;
  session: Session | null;
}) {
  return (
    <div className="flex">
      <h1>{template.name}</h1>
      {session?.user && session.user.id === template.userId && (
        <div className="ml-auto flex">
          <Link href={`/dashboard/templates`}>
            <button className="button shy">
              <ArrowLeftIcon className="mr-2 h-4 w-4 opacity-30" />
              My Templates
            </button>
          </Link>
          <Link href={`/dashboard/templates/edit/${template.id}`}>
            <button className="button shy">
              <PencilIcon className="mr-2 h-4 w-4 opacity-30" />
              Edit
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
