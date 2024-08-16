"use client";

import { DisclosureButton } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  href: string;
}

export default function NavLinkMobile({
  href,
  children,
}: PropsWithChildren<Props>) {
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
