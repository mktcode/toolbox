import NavLink from "./navLink";

export default function Nav() {
  return <div className="flex space-x-3 text-sm text-gray-500">
    <NavLink
      href="/dashboard"
    >
      Dashboard
    </NavLink>
    <NavLink
      href="/dashboard/chat"
    >
      Chat
    </NavLink>
    <NavLink
      href="/dashboard/templates"
    >
      Templates
    </NavLink>
  </div>;
}