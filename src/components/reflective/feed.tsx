"use client";

import React from "react";
import dynamic from "next/dynamic";

const FeedPosts = dynamic(() => import("./feedPosts"), { ssr: false });

const Feed = () => {
  return (
    <div className="space-y-4">
      <FeedPosts />
    </div>
  );
};

export default Feed;
