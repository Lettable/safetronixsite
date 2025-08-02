import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoCSAM — A Coalition Against Child Sexual Abuse Material",
  description:
    "NoCSAM is an independent digital taskforce focused on reporting CSAM online. Our mission is to assist global agencies and NGOs by providing automated reports and threat intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
