import type { Metadata } from "next";
import "@/app/globals.css";
import Vertical from "@/components/layout/vertical";

export const metadata: Metadata = {
  title: "Asset Management",
  description: "Asset Management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Vertical>
      {children}
    </Vertical>
  )
}
