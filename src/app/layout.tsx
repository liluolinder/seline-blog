import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundProvider } from "@/lib/background-context";
import { BackgroundWrapper } from "@/components/layout/BackgroundWrapper";
import { BackgroundToggle } from "@/components/layout/BackgroundToggle";

export const metadata: Metadata = {
  title: "Seline Blog - 记录技术、生活和思考",
  description: "个人技术博客，分享前端开发、项目经验和生活思考",
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
          <div className="fixed bottom-6 left-6 z-50">
            <BackgroundToggle />
          </div>
        </BackgroundProvider>
      </body>
    </html>
  );
}
