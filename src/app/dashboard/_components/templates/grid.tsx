import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Grid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center justify-center rounded-lg border-white bg-gray-50 p-4 shadow-black/10">
        <PencilSquareIcon className="size-12 text-gray-200" />
        <h2 className="text-lg font-bold text-black/70">New Template</h2>
      </div>
      <div className="rounded-lg border-white bg-gray-50 p-4 shadow-black/10">
        <h2 className="text-lg font-bold text-black/70">Native Speaker</h2>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}
