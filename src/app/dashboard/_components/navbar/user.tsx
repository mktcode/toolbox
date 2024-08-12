import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArrowRightEndOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import TopupButton from './topupButton';

export default async function User() {
  const session = await getServerAuthSession();
  
  if (!session) {
    return null;
  }

  return (
    <Menu>
      <MenuButton className="ml-auto inline-flex items-center gap-2 rounded-md bg-gray-50 py-1.5 px-3 text-sm/6 font-semibold text-gray-900 focus:outline-none data-[hover]:bg-gray-100 data-[open]:bg-gray-100 data-[focus]:outline-1 data-[focus]:outline-white">
        <Image src="/img/avatar-placeholder.jpg" alt="Avatar" width={24} height={24} className="rounded-full" />
        <div className='flex flex-col items-start'>
          <span className='leading-4'>{session.user.name}</span>
          <span className='text-gray-400 text-xs font-light'>{session.user.currentBalance.toFixed(2)} €</span>
        </div>
        <ChevronDownIcon className="size-4 fill-gray-300" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-gray-50 bg-gray-50 mt-1 p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <TopupButton />
        <MenuItem>
          <Link
            href="/api/auth/signout"
            className="usermenu-item"
          >
            <ArrowRightEndOnRectangleIcon className="size-4 fill-gray-300" />
            Sign out
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
