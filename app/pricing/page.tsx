import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your language learning journey with SURI AI's emotional intelligence technology.
          </p>
        </div>

        <PricingSection />
      </div>
    </div>
  )
}

