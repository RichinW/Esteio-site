// src/app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MenuBorder from "./components/globais/menuBorder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

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
  const pathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPathname(pathname);
    console.log(pathname); 
  }, [pathname]);

  const showMenu = currentPathname !== "/login";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          {showMenu && <MenuBorder />}
          <ToastContainer />
          {children}
        </div>
      </body>
    </html>
  );
}
