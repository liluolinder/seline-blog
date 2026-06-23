import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundProvider } from "@/lib/background-context";
import { BackgroundWrapper } from "@/components/layout/BackgroundWrapper";
import { BackgroundToggle } from "@/components/layout/BackgroundToggle";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: siteConfig.seo.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen text-gray-900 dark:text-gray-100 font-sans">
        <BackgroundProvider>
          <BackgroundWrapper />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackgroundToggle />
        </BackgroundProvider>
      </body>
    </html>
  );
}
