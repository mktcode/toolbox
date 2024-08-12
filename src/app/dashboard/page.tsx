import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/dashboard/templates"
            className="flex flex-col items-center justify-center rounded-lg border-white bg-gray-50 p-4 shadow-black/10"
          >
            <PencilSquareIcon className="size-12 text-gray-200" />
            <h2 className="text-lg font-bold text-black/70">Templates</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
