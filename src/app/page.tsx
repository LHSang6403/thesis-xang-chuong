"use client";

import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import HomeSlider from "@components/Sliders/HomeSlider";
import Template from "@app/(main)/template";

export default async function Home() {
  return (
    <>
      <Header />
      <Template>
        <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
          <div className="w-[80%]">
            <HomeSlider />
          </div>
        </main>
      </Template>
      <Footer />
    </>
  );
}
