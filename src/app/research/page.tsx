"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

async function convertFilesToDataURLs(files: FileList) {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{
          type: "file";
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              mediaType: file.type,
              url: reader.result as string,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
}

export default function Research() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <div className="flex flex-col w-full max-w-2xl py-16 mx-auto stretch gap-4">
      <h1 className="text-2xl font-semibold">Deep Research</h1>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <span className="font-medium">
              {m.role === "user" ? "You: " : "AI: "}
            </span>
            {m.parts.map((part, index) => {
              if (part.type === "text") {
                return <span key={`${m.id}-text-${index}`}>{part.text}</span>;
              }
              if (
                part.type === "file" &&
                part.mediaType?.startsWith("image/")
              ) {
                return (
                  <div key={`${m.id}-image-${index}`} className="my-2">
                    <Image
                      src={part.url}
                      width={500}
                      height={500}
                      alt={`attachment-${index}`}
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
                    key={`${m.id}-pdf-${index}`}
                    src={part.url}
                    width={500}
                    height={600}
                    title={`pdf-${index}`}
                    className="my-2 border"
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>

      <form
        className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-2xl p-3 border border-gray-300 rounded shadow-xl bg-white/80 backdrop-blur space-y-2"
        onSubmit={async (event) => {
          event.preventDefault();

          const fileParts =
            files && files.length > 0
              ? await convertFilesToDataURLs(files)
              : [];

          await sendMessage({
            role: "user",
            parts: [{ type: "text", text: input }, ...fileParts],
          });

          setInput("");
          setFiles(undefined);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => {
              if (event.target.files) setFiles(event.target.files);
            }}
            multiple
            ref={fileInputRef}
          />
          <input
            className="w-full p-2 border rounded"
            value={input}
            placeholder={"Ask a research question..."}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
