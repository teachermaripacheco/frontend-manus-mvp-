"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { registerUser } from "@/lib/apiClient" // Import the API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

export default function SignupPage() {
  const router = useRouter() // Initialize useRouter
  const { toast } = useToast() // Initialize useToast

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("signupEmail") || ""
    }
    return ""
  })

  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("signupName") || ""
    }
    return ""
  })

  useEffect(() => {
    if (email) localStorage.setItem("signupEmail", email)
    if (name) localStorage.setItem("signupName", name)
  }, [email, name])

  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")

  const handleSuccessfulSignup = () => {
    localStorage.removeItem("signupEmail")
    localStorage.removeItem("signupName")
    toast({
      title: "Account Created!",
      description: "Please log in to continue.",
    })
    router.push("/login") // Redirect to login page after successful signup
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
        toast({ title: "Error", description: "You must agree to the Terms of Service and Privacy Policy.", variant: "destructive" })
        return;
    }
    setIsLoading(true)

    try {
      const response = await registerUser({ name, email, password })
      console.log("Registration successful:", response.data)
      handleSuccessfulSignup()
    } catch (error: any) {
      console.error("Registration failed:", error)
      const errorMessage = error.response?.data?.detail || "An unexpected error occurred during registration."
      toast({ title: "Registration Failed", description: errorMessage, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  // --- SSO Signup Placeholder --- 
  const handleSSOSignup = (provider: string) => {
    setSsoLoading(provider)
    toast({ title: "SSO Not Implemented", description: `Sign up with ${provider} is not yet available in this version.`, variant: "destructive" })
    // Simulate delay and reset
    setTimeout(() => {
      setSsoLoading(null)
    }, 1500)
    // In a real application, you would redirect to the provider's OAuth flow
    // The backend would need corresponding endpoints to handle the OAuth callback
  }
  // --- End SSO Placeholder ---

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
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
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                {plan
                  ? `Sign up for the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan`
                  : "Enter your details to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SSO Options - Placeholder */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOSignup("google")}
                  disabled={ssoLoading !== null}
                >
                  {ssoLoading === "google" ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      {/* Google Icon SVG */}
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                  )}
                  <span>Sign up with Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOSignup("apple")}
                  disabled={ssoLoading !== null}
                >
                  {ssoLoading === "apple" ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      {/* Apple Icon SVG */}
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                  )}
                  <span>Sign up with Apple</span>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)} // Handle Checkbox state
                    required 
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-suri-blue hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-suri-blue hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white"
                  disabled={isLoading || ssoLoading !== null}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-suri-blue hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

