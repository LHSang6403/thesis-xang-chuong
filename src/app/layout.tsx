import { GeistSans } from "geist/font/sans";
import "@app/styles/globals.css";
import "@app/styles/prosemirror.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import Providers from "@components/Providers/Providers";

export const metadata = {
  title: "Web3 Grad. Thesis",
  description: "Try to graduate HCMUS.",
  keywords: "next.js, web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${GeistSans.className}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <Providers>
          <main className="mx-auto flex min-h-screen w-screen max-w-[2200px] flex-col items-center overflow-hidden">
            {children}
            <NavDrawer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
