'use client';

import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./globals.css";
import { BgLyout } from "@/app/components/templates";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-vazirmatn',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
 // in a real project we should have it via next auth or cookie by middleware 
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/auth');
    }
  }, [router]);

  return (
    <html lang="en" className={vazirmatn.variable} dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BgLyout>
          {children}
        </BgLyout>
      </body>
    </html>
  );
}
