import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Switch to Outfit for a premium tech feel
import "./globals.css";
import { PlannerProvider } from "@/context/PlannerContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exam Seat Planner",
  description: "Optimized Exam Seat Allocation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.className} antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <PlannerProvider>
          {children}
        </PlannerProvider>
      </body>
    </html>
  );
}
