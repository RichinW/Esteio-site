// src/app/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MenuBorder from "./components/globais/menuBorder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "@fontsource/rubik";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPathname, setCurrentPathname] = useState<string | null>(null);

  const showMenu = currentPathname !== "/login/";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-rubik`}
      >
        <div className="flex">
          {showMenu && <MenuBorder />}
          {children}
        </div>
      </body>
    </html>
  );
}
