"use client";

import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Clock, ThumbsUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

import { type Post } from "~/lib/types";

const FeedPosts = () => {
  const [posts, setPosts] = useLocalStorage<Post[]>("posts", []);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              {formatTime(post.timestamp)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{post.content}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(post.id)}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              {post.likes > 0 && <span>{post.likes}</span>}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default FeedPosts;
