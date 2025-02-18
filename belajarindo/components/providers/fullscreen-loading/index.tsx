"use client"

import { Loader2 } from "lucide-react"
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const loadingContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | null>(null)

const FullScreenLoading = () => {
  const [loading] = useLoading()
  return (
    <div data-state={loading ? "open" : "closed"} className={cn("w-full h-full fixed top-0 left-0 flex items-center justify-center inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:invisible")}>
      <Loader2 className="w-16 h-16 animate-spin text-background" />
    </div>
  )
}

const FullScreenLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <loadingContext.Provider value={useState(false)}>
      {children}
      <FullScreenLoading />
    </loadingContext.Provider>
  )
}

const useLoading = () => {
  const context = useContext(loadingContext)
  if (context === null) {
    throw new Error("useLoading must be used within a FullScreenLoadingProvider")
  }
  return context
}

export { FullScreenLoadingProvider, useLoading }
