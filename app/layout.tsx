import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EDGE for Garments | Premium Denim & Garment Manufacturing",
  description: "Egyptian manufacturer specializing in high-quality denim and woven garments.",
};

// Root layout - minimal wrapper for redirect handling
// Actual layouts are in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
