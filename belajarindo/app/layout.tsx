import type { Metadata } from "next";
import { Source_Sans_3 } from 'next/font/google'; 

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: 'swap'
})

import "./globals.css";

export const metadata: Metadata = {
  title: "Belajar Indo - Your website to learn Bahasa Indonesia",
  description: "Your website to learn Bahasa Indonesia",
};

export default function RootLayout({ 
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sourceSans3.className}>
      <body>
        <header>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <p className="text-2xl text-amber-600 font-extrabold">Belajar Indo</p>
          <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              Why Belajar Indo?
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="rounded-full">
              Sign Up
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
        </nav>
        </header>
        { children }
        <footer className="py-6 md:px-8 md:py-0" style={{backgroundColor: "hsl(47.9, 95.8%, 53.1%)",}}>
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p>Belajar Indo | Your website to learn Bahasa Indonesia</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"