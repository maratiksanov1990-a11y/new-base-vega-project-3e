import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Inter({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Панель управления",
  description: "Административная панель управления: генерации, пользователи, тарифы, AI поставщики и аналитика.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${fontSans.variable} bg-background`}
      style={{ overflowAnchor: "none", overscrollBehavior: "none" }}
    >
      <body
        className="antialiased"
        style={{ overscrollBehavior: "none" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
