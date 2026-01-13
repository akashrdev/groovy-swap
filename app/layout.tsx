import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./_components/navigation/navbar";
import { AppProviders } from "./_context/app";
import { Footer } from "./_components/navigation/footer";
import { aeonik, ppNeueBit } from "@/fonts";

export const metadata: Metadata = {
  title: "Groovy Swap",
  description: "The grooviest way to swap",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppNeueBit.variable} ${aeonik.variable}`}>
      <body
        className={`${ppNeueBit.className} bg-white min-h-screen flex flex-col`}
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
