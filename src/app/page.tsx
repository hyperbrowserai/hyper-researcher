"use client";

import { useRouter } from "next/navigation";
import { HeroSearch } from "@/components/hero-search";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
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
  );
}
