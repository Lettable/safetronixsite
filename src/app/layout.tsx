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
  title: "Safetronix — Fighting CSAM, DMCA Violations & Digital Threats",
  description:
    "Safetronix is your frontline defense against child sexual abuse material (CSAM), DMCA violations, and all forms of digital threats.",
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
