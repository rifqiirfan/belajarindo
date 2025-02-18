import type { Metadata } from "next";
// import "@/app/globals.css";
import Vertical from "@/components/layout/vertical";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Vertical>
      {children}
    </Vertical>
  )
}
