"use client";

import { type CoreMessage } from "ai";
import AssistantMessage from "./assistantMessage";
import UserMessage from "./userMessage";
import SystemMessage from "./systemMessage";

export default function Message({ message }: { message: CoreMessage }) {
  switch (message.role) {
    case "system":
      return <SystemMessage message={message} />;
    case "assistant":
      return <AssistantMessage message={message} />;
    default:
      return <UserMessage message={message} />;
  }
}
