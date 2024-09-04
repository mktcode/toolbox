import "~/styles/globals.css";
import { HydrateClient } from "~/trpc/server";

import { type Metadata } from "next";

import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Toolbox / Dashboard",
  description: "AI tools I've built and use every now and then",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col bg-gray-200">
        <Navbar />
        {children}
      </div>
    </HydrateClient>
  );
}
