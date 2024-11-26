import React from "react";
import Navigation from "~/components/reflective/navigation";
import NewPost from "~/components/reflective/newPost";
import Feed from "~/components/reflective/feed";
import { getServerAuthSession } from "~/server/auth";

const FeedView = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation session={session} />

      <main className="mx-auto max-w-2xl space-y-8 p-4 pt-20">
        <NewPost />
        <Feed />
      </main>
    </div>
  );
};

export default FeedView;
