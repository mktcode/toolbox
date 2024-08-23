import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Chat", href: "/dashboard/chat" },
  { name: "Templates", href: "/dashboard/templates" },
];

export const userNavigation = [
  {
    name: "Top up",
    href: "#",
    onClick: () => console.log("Top up"),
    icon: BanknotesIcon,
  },
  {
    name: "Sign out",
    href: "/api/auth/signout",
    icon: ArrowRightStartOnRectangleIcon,
  },
];
