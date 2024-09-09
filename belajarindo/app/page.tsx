import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export const description =
  "This is a default page dedicated for all Belajar Indo application."

export default function Home() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1533339577339-9007cb316e9c?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Padar Island in Komodo National Park. Photo by Rashel Ochoa on Unsplash."
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-6 text-center">
            <h1 className="scroll-m-12 text-4xl text-blue-900 font-extrabold tracking-tight lg:text-5xl">Power up your Bahasa Indonesia skill with ease!</h1>
            
            <Button variant="outline">
              <Link href="/login" legacyBehavior passHref>I already had an account</Link>
            </Button>
            
            <Button>
              <Link href="/signup" legacyBehavior passHref>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid-cols-none">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle><h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">Why Belajar Indo?</h2></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Access from anywhere</p>
                <p>Belajar Indo can be accessed even if you’re offline.</p>
              </div>
              <div className="grid gap-3">
                <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Works with any device</p>
                <p>Whether on your laptop, smartphone, or tablet, you can enjoy Belajar Indo.</p>
              </div>
              <div className="grid gap-3">
                <p className="scroll-m-20 text-2xl font-semibold tracking-tight">It&apos;s free</p>
                <p>While we are developing, Belajar Indo will cost zero money.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
  )
}