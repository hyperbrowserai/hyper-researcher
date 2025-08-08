"use client";

import Image from "next/image";
import { type UIMessage } from "ai";

export function MessageList({ messages }: { messages: UIMessage[] }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          <div className="text-xs text-zinc-500 mb-1">
            {m.role === "user" ? "You" : "AI"}
          </div>
          {m.parts.map((part, idx) => {
            if (part.type === "text") return <div key={idx}>{part.text}</div>;
            if (part.type === "file" && part.mediaType?.startsWith("image/"))
              return (
                <Image
                  key={idx}
                  src={part.url}
                  width={512}
                  height={512}
                  alt="attachment"
                />
              );
            if (part.type === "file" && part.mediaType === "application/pdf")
              return (
                <iframe
                  key={idx}
                  src={part.url}
                  className="w-full h-[600px] border"
                  title={`pdf-${idx}`}
                />
              );
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
