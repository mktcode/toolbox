"use client";

import { PlayIcon } from "@heroicons/react/24/outline";

export default function SampleButton({ path }: { path: string }) {
  const audio = new Audio(path);

  const start = () => {
    void audio.play();
  };

  return (
    <button onClick={start} className="button shy">
      <PlayIcon className="h-4 w-4" />
    </button>
  );
}
