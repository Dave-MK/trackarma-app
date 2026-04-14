import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Trackarma",
  description: "Track meaningful daily actions, karma, streaks, and repair moments."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-[family-name:var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
