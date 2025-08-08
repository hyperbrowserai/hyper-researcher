"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (files: FileList | undefined) => Promise<void> | void;
};

export function Composer({ value, onChange, onSubmit }: ComposerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(fileRef.current?.files ?? undefined);
        if (fileRef.current) fileRef.current.value = "";
      }}
      className="border-t bg-background/70 backdrop-blur p-3"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border px-3 py-2">
        <Input
          className="flex-1 border-0 bg-transparent focus-visible:ring-0"
          placeholder="Ask anything…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="text-xs"
        />
        <Button type="submit" size="sm">
          Send
        </Button>
      </div>
    </form>
  );
}
