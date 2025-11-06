import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./_components/navigation/navbar";
import { AppProviders } from "./_context/app";
import { Footer } from "./_components/navigation/footer";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "Groovy Swap",
  description: "The grooviest way to swap",
  icons: {
    icon: "/favicon.ico"
  }
};

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-gradient-primary min-h-screen flex flex-col`}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1 pt-8 pb-10 mx-auto">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
