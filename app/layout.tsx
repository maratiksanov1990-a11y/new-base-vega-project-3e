import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Inter({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Панель управления — Аналитика",
  description: "Дашборд с ключевыми метриками, графиками и таблицей заказов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${fontSans.variable} bg-background`}>
      <body
        className="antialiased"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
