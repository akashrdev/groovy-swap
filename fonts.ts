import localFont from "next/font/local";

export const ppNeueBit = localFont({
  src: [
    {
      path: "./public/fonts/PPNeueBit/PPNeueBit-Bold.otf",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-ppneuebit",
  display: "swap"
});

export const aeonik = localFont({
  src: [
    {
      path: "./public/fonts/Aeonik/Aeonik-Medium.otf",
      weight: "500",
      style: "normal"
    }
  ],
  variable: "--font-aeonik",
  display: "swap"
});
