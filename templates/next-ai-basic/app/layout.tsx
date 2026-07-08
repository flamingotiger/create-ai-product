import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next AI Basic",
  description: "A minimal AI product starter built with Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
