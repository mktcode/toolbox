"use client";

import { MenuItems } from "@headlessui/react";
import Link from "next/link";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

export default function UserNav() {
  return (
    <MenuItems
      transition
      className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <Link
        href="/api/auth/signout"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[focus]:bg-gray-100"
      >
        <ArrowRightStartOnRectangleIcon className="mr-3 inline-block h-4 w-4" />
        Sign out
      </Link>
    </MenuItems>
  );
}
