"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PersonalInfoStep from "@/components/personal-info-step"
import ContactInfoStep from "@/components/contact-info-step"
import AccountInfoStep from "@/components/account-info-step"

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

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your server
  }

  return (
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
  )
}

