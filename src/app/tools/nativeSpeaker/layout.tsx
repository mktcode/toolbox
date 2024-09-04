import "~/styles/globals.css";
import { HydrateClient } from "~/trpc/server";

import { type Metadata } from "next";

import Navbar from "./../../dashboard/_components/navbar";

export const metadata: Metadata = {
  title: "Toolbox / Native Speaker",
  description: "AI tools I've built and use every now and then",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </div>
    </HydrateClient>
  );
}
