import React from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

import Navigation from "~/components/reflective/navigation";
import { getServerAuthSession } from "~/server/auth";

const MarketView = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation session={session} />

      <main className="mx-auto max-w-2xl space-y-8 p-4 pt-20">
        <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold">Market</h2>
          <p className="mt-2 text-gray-500">
            Discover sustainable products and services.
          </p>

          {/* Placeholder for intro text */}
          <Card className="mt-8 bg-white p-6 text-left">
            <ul className="list-disc space-y-1 pl-4 text-gray-500">
              <li>There are no profiles and no advertisement.</li>
              <li>
                Posting is held respectful with the kind assistance of AI.
              </li>
              <li>
                Consuming content is throttled to prevent information overload.
              </li>
              <li>
                This is a safe space for reflection about topics and ideas, as
                an individual or a community, private and public.
              </li>
              <li>Valuable, humble feedback, instead of immediate judgment.</li>
              <li>
                From personal challenges, through professional issues, to global
                responsibilities.
              </li>
              <li>
                Entertainment is a tool for relaxation and inspiration, not a
                means to distract or manipulate.
              </li>
              <li>
                Provided by a group of professional software engineers, dialogue
                facilitators, mediators, psychologists, and caring people.
              </li>
              <li>Funded by donations and a fair marketplace.</li>
            </ul>
            <div className="mt-4 text-center">
              <p className="my-8">
                <i className="text-xl text-gray-400">
                  We have developed speed, but we have shut ourselves in. -
                  Charlie Chaplin
                </i>
              </p>
              <Button className="mt-4">Sounds reasonable.</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MarketView;
