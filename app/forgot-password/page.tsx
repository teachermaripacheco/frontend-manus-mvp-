"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, you would handle password reset here
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <div className="flex justify-center items-center flex-1 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-6">
                <span className="text-3xl mr-2">🧠</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-suri-blue to-suri-lavender bg-clip-text text-transparent">
                  SURI AI
                </span>
              </div>
              <CardTitle className="text-2xl text-center">Reset your password</CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isSubmitted ? (
                <div className="py-4 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-suri-teal/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-suri-teal" />
                  </div>
                  <h3 className="text-lg font-medium">Check your email</h3>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button className="text-suri-blue hover:underline" onClick={() => setIsSubmitted(false)}>
                      try again
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-suri-blue hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

