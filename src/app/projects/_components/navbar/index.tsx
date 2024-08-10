import Link from "next/link";
import ProjectSelect from "./../projectSelect";
import { getServerAuthSession } from "~/server/auth";
import TopupButton from "./topupButton";
import Balance from "./balance";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="flex items-center pr-4 py-2 border-b fixed w-full bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" className="w-8 mr-2 -ml-1">
        <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1s-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z" fill="currentColor" />
      </svg>
      <h1 className="text-xl font-bold">
        Senior
      </h1>
      { session?.user && <ProjectSelect /> }
      { session?.user && <button className="rounded-md px-3 py-1 ml-4 text-gray-400 bg-gray-50">
        +
      </button> }
      <div className="ml-auto flex items-center">
        {session?.user && <>
          <Balance />
          <TopupButton />
        </>}
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="button secondary small ml-2"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  )
}