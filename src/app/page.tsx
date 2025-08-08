"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeroSearch } from "@/components/hero-search";
import { AppSidebar } from "@/components/app-sidebar";
import { BackgroundOrbs } from "@/components/background-orbs";

export default function Home() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundOrbs />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-0 h-[100svh] z-20">
          <AppSidebar
            collapsed={isCollapsed}
            onToggleCollapse={(next) => setIsCollapsed(next ?? !isCollapsed)}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 relative px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <div className="flex min-h-[100svh] items-center py-24">
            <div className="mx-auto w-full max-w-3xl">
              <HeroSearch
                onSubmit={(q) => {
                  const id = crypto.randomUUID();
                  const url = q
                    ? `/chat/${id}?q=${encodeURIComponent(q)}`
                    : `/chat/${id}`;
                  router.push(url);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
