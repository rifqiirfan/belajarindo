"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle } 
  from "@/components/ui/card"

import PersonalInfoStep from "@/components/personal-info-step"
import ContactInfoStep from "@/components/contact-info-step"
import AccountInfoStep from "@/components/account-info-step"
import {signup} from "@/core/features/SIgnup/signup.service";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  country: z.string().min(1, "Country is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
})

const contactInfoSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
})

const accountInfoSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password should contain at least one special character"
    ),
})

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = () => {
    try {
      if (step === 1) {
        personalInfoSchema.parse({
          fullName: formData.fullName,
          country: formData.country,
          dateOfBirth: formData.dateOfBirth,
        });
      } else if (step === 2) {
        contactInfoSchema.parse({
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });
      } else if (step === 3) {
        accountInfoSchema.parse({
          username: formData.username,
          password: formData.password,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      console.log("Form submitted:", formData)
      const newData = {
        ...formData,
        full_name: formData.fullName,
        dob: formData.dateOfBirth
      }
      const res = await signup({data: newData})
      if (!res?.success && res.error) {
        toast.error("Sign up failed. " + res.error)
        return
      }
      toast.success("Sign up success.")
      // Here you would typically send the data to your server
    }
  }

  return (
  <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Create your account in 3 easy steps</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          {step === 1 && <PersonalInfoStep formData={formData} updateFormData={updateFormData} />}
          {step === 2 && <ContactInfoStep formData={formData} updateFormData={updateFormData} />}
          {step === 3 && <AccountInfoStep formData={formData} updateFormData={updateFormData} />}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
          Previous
        </Button>
        {step < 3 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
  )
}

