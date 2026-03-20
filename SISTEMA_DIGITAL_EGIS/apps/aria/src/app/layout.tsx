import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARIA · Orientación habitacional gratuita",
  description: "Asistente EGIS del MINVU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-crema min-h-screen text-texto antialiased font-body">
        {children}
      </body>
    </html>
  );
}
