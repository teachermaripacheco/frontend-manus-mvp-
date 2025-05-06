"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Send } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export default function ContactPage() {
  const { translate } = useTranslation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: translate("Message sent!"),
      description: translate("We'll get back to you as soon as possible."),
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {translate("Back to Home")}
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{translate("Contact Us")}</CardTitle>
          <CardDescription>{translate("Have questions about SURI AI? We're here to help.")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{translate("Name")}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={translate("Your name")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translate("Email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={translate("Your email address")}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{translate("Subject")}</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={translate("What is this regarding?")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{translate("Message")}</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={translate("How can we help you?")}
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="bg-suri-blue hover:bg-suri-blue/80 text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  {translate("Sending...")}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {translate("Send Message")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t pt-6">
          <h3 className="font-medium mb-2">{translate("Other Ways to Reach Us")}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{translate("Email")}: support@suri-ai.com</p>
            <p>{translate("Phone")}: +1 (555) 123-4567</p>
            <p>{translate("Address")}: 123 AI Avenue, San Francisco, CA 94107</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

