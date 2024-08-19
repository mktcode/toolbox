"use client";

import { useSession } from "next-auth/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { type Template } from "@prisma/client";
import Link from "next/link";

export default function Header({ template }: { template: Template }) {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between">
      <h1>{template.name}</h1>
      {session?.user && session.user.id === template.userId && (
        <>
          <Link href={`/dashboard/templates/edit/${template.id}`}>
            <button className="button shy">
              <PencilIcon className="mr-2 h-4 w-4 opacity-30" />
              Edit
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
