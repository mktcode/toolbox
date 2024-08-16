"use client";

import { MenuItems } from "@headlessui/react";
import { userNavigation } from "./_lib";
import Link from "next/link";

export default function UserNav() {
  return (
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      {userNavigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
          onClick={item.onClick}
        >
          {item.name}
        </Link>
      ))}
    </MenuItems>
  );
}
