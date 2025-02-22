import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navigation/navbar";
import { AppProviders } from "./context/app";
import { Footer } from "./components/navigation/footer";

export const metadata: Metadata = {
  title: "Groovy Swap",
  description: "The grooviest way to swap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-outfit bg-primary-dark">
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
