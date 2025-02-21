"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleLogInButton } from "@/components/google-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/core/features/Login/login.service";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordEye = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const disabled = props.value != '' || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        ref={ref}
        {...props}
        className={cn('hide-password-toggle pr-10', className)}
        type={showPassword ? 'text' : 'password'}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={!disabled}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  )
})
PasswordEye.displayName = 'PasswordEye'

const loginSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(1, "Password is Required"),
})

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await login(data)
    if (!res?.success && res?.error) {
      toast.error("Failed to login. " + res.error)
      return
    }

    toast.success("Login success")
  }

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            name={"username"}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <FormItem className={"grid gap-2"}>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="john.doe"
                    className={error ? "border-destructive" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"password"}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <FormItem className={"grid gap-2"}>
                <FormLabel>Password</FormLabel>
                <FormControl>

                  <PasswordEye
                    className={error ? "border-destructive" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div
            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <GoogleLogInButton />
          {/*<Button type={"button"} variant="outline" className="w-full" onClick={() => {console.log("click")}}>*/}
          {/*<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">*/}
          {/*  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
          {/*</svg>*/}
          {/*  Login with Google*/}
          {/*</Button>*/}
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  )
}
