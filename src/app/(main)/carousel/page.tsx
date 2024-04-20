"use client";

import HomeSlider from "@components/Sliders/HomeSlider";

export default async function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
      <div className="w-[80%]">
        <HomeSlider />
      </div>
    </main>
  );
}
