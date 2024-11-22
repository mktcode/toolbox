"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  AlertCircle,
  Bot,
  Loader2,
  Clock,
  ThumbsUp,
  Home,
  Compass,
  Menu,
  Drama,
  ShoppingBag,
} from "lucide-react";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type Post = {
  id: number;
  content: string;
  timestamp: Date;
  feedback: string[] | null;
  likes: number;
};

type Props = {
  currentView: string;
  setCurrentView: (view: string) => void;
};

const Navigation = ({ currentView, setCurrentView }: Props) => (
  <header className="fixed left-0 right-0 top-0 z-10 border-b bg-white">
    <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
      {/* Logo/Brand */}
      <div className="text-xl font-semibold">Reflective</div>

      {/* Navigation Links */}
      <nav className="hidden items-center space-x-6 md:flex">
        <Button
          variant={currentView === "feed" ? "default" : "ghost"}
          className="flex items-center gap-2"
          onClick={() => setCurrentView("feed")}
        >
          <Home className="h-4 w-4" />
          Feed
        </Button>
        <Button
          variant={currentView === "explore" ? "default" : "ghost"}
          className="flex items-center gap-2"
          onClick={() => setCurrentView("explore")}
        >
          <Compass className="h-4 w-4" />
          Explore
        </Button>
        <Button
          variant={currentView === "market" ? "default" : "ghost"}
          className="flex items-center gap-2"
          onClick={() => setCurrentView("market")}
        >
          <ShoppingBag className="h-4 w-4" />
          Market
        </Button>
        <Button
          variant={currentView === "relax" ? "default" : "ghost"}
          className="flex items-center gap-2"
          onClick={() => setCurrentView("relax")}
        >
          <Drama className="h-4 w-4" />
          Relax
        </Button>
      </nav>

      {/* User Menu */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-2 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 md:hidden">
            <DropdownMenuItem onClick={() => setCurrentView("feed")}>
              <Home className="mr-2 h-4 w-4" />
              Feed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentView("explore")}>
              <Compass className="mr-2 h-4 w-4" />
              Explore
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
);

const SocialPostInterface = () => {
  const [currentView, setCurrentView] = useState("feed");
  const [postContent, setPostContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [feedback, setFeedback] = useState<string[] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Simulate AI analysis
  const analyzeContent = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      if (postContent.trim()) {
        const sampleFeedback = [
          "This post appears to make assumptions about economic factors without citing sources.",
          "Consider if this perspective accounts for different cultural contexts.",
          "The tone might come across as dismissive to some readers.",
        ];
        setFeedback(sampleFeedback);
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (autoMode && e.target.value.length > 50) {
      analyzeContent();
    }
  };

  const handlePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        content: postContent,
        timestamp: new Date(),
        feedback: feedback,
        likes: 0,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
      setFeedback(null);
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      <main className="mx-auto max-w-2xl space-y-8 p-4 pt-20">
        {currentView === "feed" ? (
          <>
            {/* Post Creation Form */}
            <div className="space-y-4 rounded-lg border bg-white p-4">
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handleTextChange}
                className="min-h-[120px] w-full resize-none"
              />

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={analyzeContent}
                    disabled={isAnalyzing || !postContent.trim()}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    Check Assumptions
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm">Auto-check</span>
                    <Switch checked={autoMode} onCheckedChange={setAutoMode} />
                  </div>
                </div>

                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                >
                  <MessageCircle className="h-4 w-4" />
                  Post
                </Button>
              </div>

              {feedback && (
                <Alert variant="default" className="mt-4">
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Consider these points:</p>
                      <ul className="list-disc space-y-1 pl-4">
                        {feedback.map((point, index) => (
                          <li key={index} className="text-sm">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
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
                    {post.feedback && (
                      <div className="mt-4 rounded-md bg-gray-50 p-3">
                        <p className="mb-2 text-sm font-medium">
                          AI Reflection Points:
                        </p>
                        <ul className="list-disc space-y-1 pl-4">
                          {post.feedback.map((point, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-semibold">Explore View</h2>
            <p className="mt-2 text-gray-500">
              Discover new perspectives and conversations.
            </p>

            {/* Placeholder for intro text */}
            <Card className="mt-8 bg-white p-6 text-left">
              <ul className="list-disc space-y-1 pl-4 text-gray-500">
                <li>There are no profiles and no advertisement.</li>
                <li>
                  Posting is held respectful with the kind assistance of AI.
                </li>
                <li>
                  Consuming content is throttled to prevent information
                  overload.
                </li>
                <li>
                  This is a safe space for reflection about topics and ideas, as
                  an individual or a community, private and public.
                </li>
                <li>
                  Valuable, humble feedback, instead of immediate judgment.
                </li>
                <li>
                  From personal challenges, through professional issues, to
                  global responsibilities.
                </li>
                <li>
                  Entertainment is a tool for relaxation and inspiration, not a
                  means to distract or manipulate.
                </li>
                <li>
                  Provided by a group of professional software engineers,
                  dialogue facilitators, mediators, psychologists, and caring
                  people.
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
        )}
      </main>
    </div>
  );
};

export default SocialPostInterface;
