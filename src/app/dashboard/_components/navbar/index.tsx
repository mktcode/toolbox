import { getServerAuthSession } from "~/server/auth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./navLink";
import NavLinkMobile from "./navLinkMobile";
import { navigation } from "./_lib";
import UserNav from "./userNav";
import UserNavMobile from "./userNavMobile";
import NavbarLoggedOut from "./loggedOut";
import FeedbackModal from "../feedback/modal";

export default async function Navbar() {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return <NavbarLoggedOut />;
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard">
                <Image
                  alt="Your Company"
                  src="/img/logo.svg"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-auto mr-6">
            <FeedbackModal />
          </div>
          <div className="mr-2 text-sm font-medium text-gray-300 md:mr-0">
            {user.currentBalance.toFixed(2)} €
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <Menu as="div" className="relative ml-4">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt=""
                      src={user.image ?? "/img/avatar-placeholder.jpg"}
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                    />
                  </MenuButton>
                </div>
                <UserNav />
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <NavLinkMobile key={item.name} href={item.href}>
              {item.name}
            </NavLinkMobile>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Image
                alt=""
                src={user.image ?? "/img/avatar-placeholder.jpg"}
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {user.name}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
          <UserNavMobile />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
