import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import Template from "@app/(main)/template";

export default async function Home() {
  return (
    <>
      <Header />
      <Template>
        <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
          <h1 className="text-2xl font-semibold">Demo Web3</h1>
        </main>
      </Template>
      <Footer />
    </>
  );
}
