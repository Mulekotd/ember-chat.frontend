import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { ConfigProvider } from "@/hooks/useConfig";
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
  title: "Ember Chat",
  description: "Conversas que desaparecem como chamas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </ConfigProvider>
      </body>
    </html>
  );
}
