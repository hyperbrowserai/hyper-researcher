"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mic, Search } from "lucide-react";

type HeroSearchProps = {
  onSubmit: (query: string) => void;
  title?: string;
  subtitle?: string;
};

export function HeroSearch({ onSubmit, title, subtitle }: HeroSearchProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative min-h-[60svh] text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(75,85,99,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.12),transparent_40%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-32 pb-10">
        <div className="mb-10 text-center">
          <div className="text-5xl font-semibold tracking-tight">
            {title ?? "Hyper Research"}
          </div>
          <div className="mt-3 text-zinc-400">
            {subtitle ?? "Deep research with multi‑modal reasoning"}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(query.trim());
          }}
          className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
        >
          <div className="flex items-center gap-3 px-2">
            <Search className="size-5 text-zinc-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to know?"
              className="flex-1 border-0 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Voice"
            >
              <Mic className="size-5" />
            </Button>
            <Button
              type="submit"
              className="gap-2 text-black"
              variant="default"
            >
              DeepSearch
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 px-2 text-xs text-zinc-400">
            <span className="rounded-full border border-zinc-800 bg-black/40 px-2 py-1">
              Web
            </span>
            <span className="rounded-full border border-zinc-800 bg-black/40 px-2 py-1">
              Papers
            </span>
            <span className="rounded-full border border-zinc-800 bg-black/40 px-2 py-1">
              Code
            </span>
            <span className="rounded-full border border-zinc-800 bg-black/40 px-2 py-1">
              News
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
