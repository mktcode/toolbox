"use client";

import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

export default function Feedback({
  latestSummary,
  newFeedback,
}: {
  latestSummary: RouterOutputs["feedback"]["latestSummary"];
  newFeedback: RouterOutputs["feedback"]["newPublicFeedback"];
}) {
  const [summary, setSummary] = useState(latestSummary);
  const [feedback, setFeedback] = useState(newFeedback);

  const regenerate = api.feedback.regenerateSummary.useMutation({
    onSuccess: (newSummary) => {
      setSummary(newSummary);
      setFeedback([]);
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Recent User Feedback
      </h1>
      <p className="text-center text-base font-semibold leading-7 text-indigo-600">
        Summarized by an unbiased AI prompt.
      </p>
      <p className="mt-12 columns-1 text-center text-lg text-gray-500 lg:columns-2 lg:gap-12 lg:text-left">
        {summary ? summary.body : "No feedback yet. :("}
      </p>

      {feedback.length > 0 && (
        <div className="mt-12 text-center text-gray-500">
          {regenerate.isPending && (
            <button className="button mx-auto">
              <ArrowPathIcon className="mr-3 h-5 w-5 animate-spin opacity-50" />
              <div className="flex flex-col items-start">
                <span>Regenerating feedback...</span>
              </div>
            </button>
          )}
          {!regenerate.isPending && (
            <button
              className="button mx-auto"
              onClick={() => regenerate.mutate()}
              disabled={regenerate.isPending}
            >
              <ArrowPathIcon className="mr-3 h-5 w-5 opacity-50" />
              <div className="flex flex-col items-start">
                <span>Regenerate feedback</span>
                <span className="text-sm opacity-70">
                  ({feedback.length} new entries)
                </span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
