"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ContactSalesPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormState("success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Our Sales Team</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Learn how SURI AI can transform language learning for your organization with our enterprise solutions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-suri-blue/10 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-suri-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Custom Implementation</h3>
                    <p className="text-muted-foreground">
                      Tailored solutions designed for your specific organizational needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-suri-blue/10 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-suri-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Volume Discounts</h3>
                    <p className="text-muted-foreground">Special pricing for organizations with 10+ users</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-suri-blue/10 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-suri-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Dedicated Support</h3>
                    <p className="text-muted-foreground">Priority access to our customer success team</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-suri-blue/10 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-suri-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Advanced Analytics</h3>
                    <p className="text-muted-foreground">Comprehensive reporting on user progress and engagement</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Request Information</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formState === "success" ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your inquiry has been received. A member of our sales team will contact you shortly.
                      </p>
                      <Button asChild>
                        <Link href="/">Return to Home</Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501-1000">501-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interest">I'm interested in</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate Solution</SelectItem>
                            <SelectItem value="education">Education Solution</SelectItem>
                            <SelectItem value="government">Government Solution</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your organization's language learning needs"
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white"
                        disabled={formState === "submitting"}
                      >
                        {formState === "submitting" ? (
                          <>
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

