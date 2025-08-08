"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ChevronDown, Paperclip } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (files: FileList | undefined) => Promise<void> | void;
  sending?: boolean;
}

export function Composer({
  value,
  onChange,
  onSubmit,
  sending,
}: ComposerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState("Model A");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(fileRef.current?.files ?? undefined);
        if (fileRef.current) fileRef.current.value = "";
      }}
      className="sticky bottom-0 z-10 border-t border-white/10 bg-zinc-950/70 backdrop-blur p-3 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="grid place-items-center h-9 w-9 rounded-full bg-black/50 border border-white/10 text-zinc-300"
          aria-label="Attach files"
          title="Attach files"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
        />

        <Input
          className="flex-1 h-10 border-0 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0"
          placeholder="What would you like to know?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-full border border-white/10 bg-black/50 text-zinc-200 gap-1"
            >
              {model}
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem onClick={() => setModel("Model A")}>
              Model A
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("Model B")}>
              Model B
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModel("Fast")}>
              Fast
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="submit"
          disabled={!value.trim() || sending}
          className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 p-0"
          aria-label="Send"
        >
          <ArrowUp className="h-4 w-4 text-zinc-100" />
        </Button>
      </div>
    </form>
  );
}
