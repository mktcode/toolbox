"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type Post } from "~/lib/types";

const NewPostButton = ({
  setPostContent,
  setFeedback,
  postContent,
}: {
  setPostContent: (content: string) => void;
  setFeedback: (feedback: string[] | null) => void;
  postContent: string;
}) => {
  const [posts, setPosts] = useLocalStorage<Post[]>("posts", []);

  const handlePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        content: postContent,
        timestamp: new Date(),
        likes: 0,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
      setFeedback(null);
    }
  };

  return (
    <Button
      size="sm"
      className="flex items-center gap-2"
      onClick={handlePost}
      disabled={!postContent.trim()}
    >
      <MessageCircle className="h-4 w-4" />
      Post
    </Button>
  );
};

export default NewPostButton;
