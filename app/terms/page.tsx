import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">Last updated: March 31, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to SURI AI. These Terms of Service govern your use of our website and services. By accessing or using
          SURI AI, you agree to be bound by these Terms.
        </p>

        <h2>2. Definitions</h2>
        <p>
          "Service" refers to the SURI AI language learning platform. "User" refers to any individual who accesses or
          uses the Service. "Content" refers to all materials available through the Service, including text, images,
          audio, and video.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features of the Service, you may be required to register for an account. You agree to
          provide accurate information during the registration process and to keep your account credentials secure.
        </p>

        <h2>4. User Conduct</h2>
        <p>
          You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair
          the Service. You agree not to attempt to gain unauthorized access to any part of the Service or any system or
          network connected to the Service.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the Service are owned by SURI AI or its licensors and are
          protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h2>6. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
          disclose information about you.
        </p>

        <h2>7. Subscription and Billing</h2>
        <p>
          Some features of the Service may require a subscription. By subscribing to the Service, you agree to pay all
          fees associated with your subscription plan. Subscription fees are non-refundable except as expressly provided
          in these Terms.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to the Service at our sole discretion,
          without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service,
          us, or third parties, or for any other reason.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.
          We do not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or
          that the Service is free of viruses or other harmful components.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          In no event shall SURI AI be liable for any indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from
          your access to or use of or inability to access or use the Service.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will
          notify you by email or by posting a notice on our website.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without
          regard to its conflict of law provisions.
        </p>

        <h2>13. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at legal@suri-ai.com.</p>
      </div>
    </div>
  )
}

