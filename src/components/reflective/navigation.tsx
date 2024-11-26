"use client";

import { Home, Compass, Menu, Drama, ShoppingBag } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { type Session } from "next-auth";

const Navigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-10 border-b bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="text-xl font-semibold">Reflective</div>

        {/* Navigation Links */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Button variant={pathname === "feed" ? "default" : "ghost"}>
            <Link href="/reflective" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Feed
            </Link>
          </Button>
          <Button variant={pathname === "explore" ? "default" : "ghost"}>
            <Link
              href="/reflective/explore"
              className="flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              Explore
            </Link>
          </Button>
          <Button variant={pathname === "market" ? "default" : "ghost"}>
            <Link href="/reflective/market" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Market
            </Link>
          </Button>
          <Button variant={pathname === "relax" ? "default" : "ghost"}>
            <Link href="/reflective/relax" className="flex items-center gap-2">
              <Drama className="h-4 w-4" />
              Relax
            </Link>
          </Button>
        </nav>

        {/* User Menu */}
        {session?.user && (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="ml-2 md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 md:hidden">
                <DropdownMenuItem>
                  <Link href="/reflective">
                    <Home className="mr-2 h-4 w-4" />
                    Feed
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reflective/explore">
                    <Compass className="mr-2 h-4 w-4" />
                    Explore
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reflective/market">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Market
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reflective/relax">
                    <Drama className="mr-2 h-4 w-4" />
                    Relax
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Sign In Button */}
        {!session?.user && (
          <Button variant="ghost" className="hidden md:block">
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navigation;
