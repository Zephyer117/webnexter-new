'use client';

import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {!isStudioRoute && <Navbar />}
          <main className={isStudioRoute ? 'h-screen p-0' : 'min-h-screen'}>
            {children}
          </main>
          {!isStudioRoute && <Footer />}
        </body>
      </html>
    </ClerkProvider>
  );
}
