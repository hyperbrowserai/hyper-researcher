"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { AppSidebar } from "@/components/app-sidebar";
import { MessageList } from "@/components/chat/message-list";
import { Composer } from "@/components/chat/composer";
import { BackgroundOrbs } from "@/components/background-orbs";

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

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    id: params.id,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const ranRef = useRef(false);
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const q = searchParams.get("q");
    if (q) {
      sendMessage({ role: "user", parts: [{ type: "text", text: q }] });
      router.replace(`/chat/${params.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-[100svh] bg-black text-white">
      <BackgroundOrbs />

      <div className="flex h-[100svh]">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-0 h-[100svh] z-20">
          <AppSidebar
            collapsed={isCollapsed}
            onToggleCollapse={(next) => setIsCollapsed(next ?? !isCollapsed)}
          />
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col h-[100svh] min-w-0">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
              <MessageList messages={messages} />
            </div>
          </div>

          {/* Composer area */}
          <div className="flex-shrink-0 border-t border-white/10 bg-black/20 backdrop-blur">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
              <Composer
                value={input}
                onChange={setInput}
                sending={status === "streaming"}
                onSubmit={async (files) => {
                  const fileParts =
                    files && files.length > 0
                      ? await convertFilesToDataURLs(files)
                      : [];
                  await sendMessage({
                    role: "user",
                    parts: [{ type: "text", text: input }, ...fileParts],
                  });
                  setInput("");
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
