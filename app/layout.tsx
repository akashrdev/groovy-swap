import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navigation/navbar";
import { AppProviders } from "./context/app";
import { Footer } from "./components/navigation/footer";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "Groovy Swap",
  description: "The grooviest way to swap",
};

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-primary-dark`}>
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
