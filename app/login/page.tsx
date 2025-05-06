"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
// Remove useUser context import if login state is handled differently (e.g., just storing token)
// import { useUser } from "@/contexts/user-context"
import { loginUser } from "@/lib/apiClient" // Import the API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  // Remove useUser context if not used for login state
  // const { login } = useUser()

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("loginEmail") || ""
    }
    return ""
  })
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (rememberMe && email) {
      localStorage.setItem("loginEmail", email)
    } else if (!rememberMe) {
        localStorage.removeItem("loginEmail")
    }
  }, [email, rememberMe])

  const handleSuccessfulLogin = (token: string) => {
    // Store the token
    localStorage.setItem("authToken", token)
    if (!rememberMe) {
        localStorage.removeItem("loginEmail")
    }
    toast({ title: "Login Successful", description: "Redirecting..." })
    // Redirect to the next step in the flow (Student Input)
    router.push("/student-input") 
  }

  // --- SSO Login Placeholder --- 
  const handleSSOLogin = (provider: string) => {
    setSsoLoading(provider)
    toast({ title: "SSO Not Implemented", description: `Login with ${provider} is not yet available.`, variant: "destructive" })
    setTimeout(() => {
      setSsoLoading(null)
    }, 1500)
    // Real implementation would involve redirecting to Firebase client-side SSO flow
    // and then potentially sending the ID token to the backend for verification/session creation.
  }
  // --- End SSO Placeholder ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Prepare form data for OAuth2PasswordRequestForm
    const formData = new FormData();
    formData.append("username", email); // FastAPI expects 'username' for email
    formData.append("password", password);

    try {
      const response = await loginUser(formData)
      console.log("Login successful:", response.data)
      if (response.data.access_token) {
        handleSuccessfulLogin(response.data.access_token)
      } else {
        throw new Error("No access token received")
      }
    } catch (error: any) {
      console.error("Login failed:", error)
      const errorMessage = error.response?.data?.detail || "An unexpected error occurred during login."
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

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
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SSO Options - Placeholder */}
              <div className="space-y-3">
                 <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOLogin("google")}
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
                  <span>Continue with Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOLogin("apple")}
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
                  <span>Continue with Apple</span>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username" // Help password managers
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-suri-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password" // Help password managers
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white" // Changed variant
                  disabled={isLoading || ssoLoading !== null}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center w-full">
                <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
                <Button
                  variant="outline"
                  className="w-full border-suri-blue text-suri-blue hover:bg-suri-blue/10"
                  onClick={() => router.push("/signup")}
                >
                  Create an account
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

