"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function UserNavMobile() {
  return (
    <div className="mt-3 space-y-1 px-2">
      <Link
        href="/api/auth/signout"
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
      >
        <ArrowRightStartOnRectangleIcon className="mr-3 inline-block h-4 w-4" />
        Sign out
      </Link>
    </div>
  );
}
