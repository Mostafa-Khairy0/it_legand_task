import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@vidstack/react/player/styles/base.css";
import {
  StoreProvider,
  SuccessProvider,
  ThemeProvider,
  Toaster,
} from "@/components";

const fontFamily = Inter({
  variable: "--font-family",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Course",
  description: "Course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={fontFamily.style}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SuccessProvider>{children}</SuccessProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
