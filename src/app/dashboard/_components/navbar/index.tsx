import { getServerAuthSession } from "~/server/auth";
import User from "./user";

export default async function Navbar() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <nav className="fixed flex w-full items-center py-2 pr-4">
      <User />
    </nav>
  );
}
