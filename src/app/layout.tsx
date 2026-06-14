import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NavigationProgress } from "../components/NavigationProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SoulSpace • Elite Anonymous Peer Support & Journal",
  description: "A pristine, private space for emotional support. Talk anonymously, find elite tools, and connect with caring peers.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f5fbf7] text-[#064e3b] antialiased selection:bg-emerald-200 selection:text-emerald-950">
        <NavigationProgress />
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
