import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/shared/components/providers/query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/shared/context/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiny LMS",
  description: "Tiny LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
