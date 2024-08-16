"use client";

import { DisclosureButton } from "@headlessui/react";
import { userNavigation } from "./_lib";

export default function UserNavMobile() {
  return (
    <div className="mt-3 space-y-1 px-2">
      {userNavigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as="a"
          href={item.href}
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
  );
}
