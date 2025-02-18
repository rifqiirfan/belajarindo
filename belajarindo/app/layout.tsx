import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { AlertDialogProvider } from "@/components/providers/alert-dialog";
import { FullScreenLoadingProvider } from "@/components/providers/fullscreen-loading";
import QueryProvider from "@/components/providers/react-query"

const notoSans = Noto_Sans({
  variable: "--font-notosans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Belajar Indo",
  description: "The best way to learn Bahasa Indonesia",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <title>Belajar Indo</title>
      <link rel="icon" href="/belajar-indo-icon.ico" sizes="any" />
      <body className={`${notoSans.variable} antialiased`}>
        <QueryProvider>
          <FullScreenLoadingProvider>
            <AlertDialogProvider>
              {children}
            </AlertDialogProvider>
          </FullScreenLoadingProvider>
          <Toaster richColors position={"top-right"} closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
