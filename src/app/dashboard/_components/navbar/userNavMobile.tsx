"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UserNavMobile() {
  return (
    <div className="mt-3 space-y-1 px-2">
      <Link
        href="/dashboard/billing"
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
      >
        <BanknotesIcon className="mr-3 inline-block h-4 w-4" />
        Billing
      </Link>
      <Link
        href="/dashboard/topup"
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
      >
        <BanknotesIcon className="mr-3 inline-block h-4 w-4" />
        Top up
      </Link>
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
