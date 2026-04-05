import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Catálogo React",
    template: "%s · Catálogo React",
  },
  description: "Sistema multi-tenant para gestão de catálogos de produtos com Supabase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
