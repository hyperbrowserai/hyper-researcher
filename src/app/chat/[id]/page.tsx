"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { MessageList } from "@/components/chat/message-list";
import { Composer } from "@/components/chat/composer";

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    id: params.id,
    initialInput: searchParams.get("q") ?? undefined,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      // fire initial prompt
      sendMessage({ role: "user", parts: [{ type: "text", text: q }] });
      router.replace(`/chat/${params.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] h-[100svh]">
      <div className="overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <Composer
        value={input}
        onChange={setInput}
        onSubmit={async (files) => {
          const fileParts = files
            ? await Promise.all(
                Array.from(files).map(
                  (file) =>
                    new Promise<{
                      type: "file";
                      mediaType: string;
                      url: string;
                    }>((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () =>
                        resolve({
                          type: "file",
                          mediaType: file.type,
                          url: reader.result as string,
                        });
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                    }),
                ),
              )
            : [];
          await sendMessage({
            role: "user",
            parts: [{ type: "text", text: input }, ...fileParts],
          });
          setInput("");
        }}
      />
    </div>
  );
}
