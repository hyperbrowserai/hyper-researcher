"use client";

import Image from "next/image";
import { type UIMessage } from "ai";

export function MessageList({ messages }: { messages: UIMessage[] }) {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          <div className="mb-2 text-xs text-zinc-500">
            {m.role === "user" ? "You" : "AI"}
          </div>
          <div className="space-y-3 text-zinc-200">
            {m.parts.map((part, idx) => {
              if (part.type === "text") {
                return (
                  <div key={`${m.id}-text-${idx}`} className="leading-relaxed">
                    {part.text}
                  </div>
                );
              }
              if (
                part.type === "file" &&
                part.mediaType?.startsWith("image/")
              ) {
                return (
                  <div
                    key={`${m.id}-img-${idx}`}
                    className="rounded-xl border border-white/10 overflow-hidden"
                  >
                    <Image
                      src={part.url}
                      width={1024}
                      height={1024}
                      className="h-auto w-full"
                      alt={`attachment-${idx}`}
                    />
                  </div>
                );
              }
              if (
                part.type === "file" &&
                part.mediaType === "application/pdf"
              ) {
                return (
                  <iframe
                    key={`${m.id}-pdf-${idx}`}
                    src={part.url}
                    className="w-full h-[600px] border border-white/10 rounded-xl"
                    title={`pdf-${idx}`}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
