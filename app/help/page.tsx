import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, MessageSquare, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Help & FAQs | SURI AI",
  description: "Get answers to your questions and find the help you need",
}

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I change my language preferences?",
      answer:
        "You can change your language preferences by clicking on the language selector in the top navigation bar. You can also visit the Languages page to see all available options and customize your learning experience.",
    },
    {
      question: "Can I download lessons for offline use?",
      answer:
        "Yes, premium users can download lessons for offline use. Look for the download icon next to eligible lessons. Downloaded content will be available in the 'My Downloads' section of your account.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Your progress is automatically tracked in your dashboard. You can see your completed lessons, practice sessions, and overall proficiency level. Detailed analytics are available in the 'Progress' tab.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and Apple Pay. For enterprise accounts, we also offer invoice payment options. All payments are securely processed through Stripe.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your account settings. Go to 'Subscription' and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within 7 days of your initial purchase for a full refund.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a link to create a new password. For security reasons, the link expires after 24 hours.",
    },
    {
      question: "Can I switch between different learning paths?",
      answer:
        "Yes, you can switch between different learning paths at any time. Go to your dashboard and select 'Change Learning Path'. Your progress in each path is saved separately.",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Help & FAQs</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
          Find answers to common questions or get in touch with our team
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search for answers..." className="pl-10" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Contact the SURI Team</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Please describe your issue or question" rows={4} />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-500">support@suri-ai.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-500">Available Monday-Friday</p>
                <p className="text-sm text-gray-500">9am-5pm EST</p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

