import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">Last updated: March 31, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          At SURI AI, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you use our language learning
          platform.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect several types of information from and about users of our Service, including:</p>
        <ul>
          <li>Personal information such as name, email address, and payment information</li>
          <li>Usage data such as how you interact with our Service</li>
          <li>Learning data such as your progress, preferences, and performance</li>
          <li>Emotional response data to personalize your learning experience</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect about you for various purposes, including:</p>
        <ul>
          <li>Providing and maintaining our Service</li>
          <li>Personalizing your learning experience</li>
          <li>Processing your payments and subscriptions</li>
          <li>Communicating with you about our Service</li>
          <li>Analyzing usage patterns to improve our Service</li>
          <li>Detecting and preventing fraudulent or unauthorized activity</li>
        </ul>

        <h2>4. How We Share Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers who perform services on our behalf</li>
          <li>Business partners with whom we jointly offer products or services</li>
          <li>Law enforcement or other governmental authorities as required by law</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against
          unauthorized or unlawful processing, accidental loss, destruction, or damage.
        </p>

        <h2>6. Your Data Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
        <ul>
          <li>The right to access your personal data</li>
          <li>The right to rectify inaccurate personal data</li>
          <li>The right to request deletion of your personal data</li>
          <li>The right to restrict processing of your personal data</li>
          <li>The right to data portability</li>
          <li>The right to object to processing of your personal data</li>
        </ul>

        <h2>7. Children's Privacy</h2>
        <p>
          Our Service is not intended for children under the age of 13. We do not knowingly collect personal information
          from children under 13.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@suri-ai.com.</p>
      </div>
    </div>
  )
}

