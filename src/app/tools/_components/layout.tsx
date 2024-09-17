import "~/styles/globals.css";
import { HydrateClient } from "~/trpc/server";
import Navbar from "./../../dashboard/_components/navbar";

export default async function ToolLayout({
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
