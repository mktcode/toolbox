"use client";

import { DisclosureButton } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavLinkMobile({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <DisclosureButton
      as={Link}
      href={href}
      className={classNames(
        isCurrent
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "block rounded-md px-3 py-2 text-base font-medium",
      )}
      aria-current={isCurrent ? "page" : undefined}
    >
      {children}
    </DisclosureButton>
  );
}
