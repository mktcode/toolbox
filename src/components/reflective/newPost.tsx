"use client";

import { useState } from "react";
import { AlertCircle, Bot, Loader2 } from "lucide-react";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Alert, AlertDescription } from "~/components/ui/alert";
import dynamic from "next/dynamic";

const NewPostButton = dynamic(() => import("./newPostButton"), { ssr: false });

const NewPost = () => {
  const [postContent, setPostContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [feedback, setFeedback] = useState<string[] | null>(null);

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

  return (
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

        <NewPostButton
          setPostContent={setPostContent}
          setFeedback={setFeedback}
          postContent={postContent}
        />
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
  );
};

export default NewPost;
