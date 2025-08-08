"use client";

import Link from "next/link";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bot,
  MessageSquare,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AppSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: (next?: boolean) => void;
}

export function AppSidebar({ collapsed, onToggleCollapse }: AppSidebarProps) {
  const startXRef = useRef<number | null>(null);

  function handlePointerDown(e: React.MouseEvent<HTMLButtonElement>) {
    startXRef.current = e.clientX;
    const onUp = (ev: MouseEvent) => {
      const startX = startXRef.current;
      startXRef.current = null;
      window.removeEventListener("mouseup", onUp);
      if (startX == null) return;
      const delta = (ev.clientX ?? startX) - startX;
      if (delta < -10) onToggleCollapse?.(true);
      else if (delta > 10) onToggleCollapse?.(false);
      else onToggleCollapse?.();
    };
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div
      className={`
        relative flex h-[100svh] flex-col border-r border-white/10 bg-zinc-950/70 backdrop-blur
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <div className="grid place-items-center h-8 w-8 rounded-full bg-zinc-900 border border-white/10 flex-shrink-0">
          <Bot className="h-4 w-4 text-zinc-300" />
        </div>
        <span
          className={`
            text-sm font-medium text-zinc-200 transition-all duration-300
            ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
          `}
        >
          HyperResearcher
        </span>
      </div>

      {/* Search */}
      <div
        className={`
          px-3 pb-3 transition-all duration-300
          ${collapsed ? "opacity-0 h-0 overflow-hidden p-0" : "opacity-100"}
        `}
      >
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5">
          <Search className="h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search ⌘K"
            className="h-7 flex-1 border-0 bg-transparent px-0 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 py-2 space-y-1 flex-1">
        <SidebarItem
          href="#"
          icon={MessageSquare}
          label="Chat"
          active
          collapsed={!!collapsed}
        />

        {/* History section - only show when not collapsed */}
        <div
          className={`
            transition-all duration-300
            ${collapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}
          `}
        >
          <div className="px-2 pt-3 text-xs uppercase tracking-wide text-zinc-500">
            History
          </div>
          <div className="px-2 text-sm text-zinc-400">Today</div>
          <SidebarSmall label="Top ETFs for Future Growth" />
          <button className="px-4 py-1.5 text-left text-sm text-zinc-400 hover:text-zinc-200">
            See all
          </button>
        </div>
      </nav>

      {/* Settings */}
      <div className="px-3 pb-4">
        <Button
          variant="ghost"
          size="sm"
          className={`
            w-full gap-2 text-zinc-400
            ${collapsed ? "justify-center px-0" : "justify-start"}
          `}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          <span
            className={`
              transition-all duration-300
              ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
            `}
          >
            Settings
          </span>
        </Button>
      </div>

      {/* Collapse toggle button */}
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => onToggleCollapse?.()}
        className="absolute top-4 -right-3 z-10 grid place-items-center h-6 w-6 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Edge handle for drag resize */}
      <button
        type="button"
        aria-label="Resize sidebar"
        onMouseDown={handlePointerDown}
        className="absolute inset-y-0 -right-1 w-2 cursor-col-resize opacity-0 hover:opacity-100 bg-white/5 transition-opacity"
      />
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200
        hover:bg-white/5
        ${active ? "bg-white/5 text-zinc-100" : "text-zinc-300"}
        ${collapsed ? "justify-center" : ""}
      `}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span
        className={`
          transition-all duration-300
          ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}

function SidebarSmall({ label }: { label: string }) {
  return (
    <div className="mx-2 truncate rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200">
      {label}
    </div>
  );
}
