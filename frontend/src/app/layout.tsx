import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";
import AuthInitializer from "@/features/auth/AuthInitializer";
import { themeInitScript } from "@/lib/theme-script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nimbus-Commerce | Online Shopping",
  description: "Shop the latest products at Nimbus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <QueryProvider>
            <AuthInitializer>
              {children}
              <ToastProvider />
            </AuthInitializer>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}