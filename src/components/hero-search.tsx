"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ChevronDown, Paperclip, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface HeroSearchProps {
  onSubmit: (query: string) => void;
}

export function HeroSearch({ onSubmit }: HeroSearchProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex w-full flex-col items-center gap-8">
      <div className="flex items-center gap-3 text-4xl md:text-5xl font-semibold tracking-tight">
        <div className="grid place-items-center h-12 w-12 rounded-full bg-zinc-900 border border-white/10">
          <Image
            src="/logoLight.svg"
            alt="HyperResearcher logo"
            width={24}
            height={24}
            className="h-6 w-6"
            priority
          />
        </div>
        <div>HyperResearcher</div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(query.trim());
        }}
        className="w-full rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
      >
        <div className="px-1 pb-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to know?"
            className="h-12 rounded-xl border-0 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid place-items-center h-9 w-9 rounded-full bg-black/50 border border-white/10 text-zinc-300"
              aria-label="Attach"
              title="Attach"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 rounded-full border border-white/10 bg-black/50 text-zinc-200 gap-1"
                >
                  Model
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                <DropdownMenuItem>Model A</DropdownMenuItem>
                <DropdownMenuItem>Model B</DropdownMenuItem>
                <DropdownMenuItem>Fast</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="submit"
              className="h-11 w-11 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 p-0"
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4 text-zinc-100" />
            </Button>
          </div>
        </div>
      </form>

      <div className="w-full space-y-3">
        {[
          "What are the economics of the current global egg shortage?",
          "Can you create an itinerary for a 10-day Japan trip?",
          "What are the top 2025 noise-cancelling headphones?",
          "What are some ETFs with the highest opportunity for growth?",
        ].map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSubmit(s)}
            className="group flex w-full items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-left text-zinc-300 hover:bg-white/5"
          >
            <Search className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
            <span className="truncate">{s}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
