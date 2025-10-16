import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neon Bank",
  description: "Neon bank, a member of the Global Digital Finance Network, is a licensed financial service provider regulated by the Central Bank of Nigeria. RC45097",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-secondary">
        {children}
      </body>
    </html>
  );
}
