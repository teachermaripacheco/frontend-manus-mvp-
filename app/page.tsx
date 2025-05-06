import LandingPage from "@/components/landing-page"
import { TranslationProvider } from "@/contexts/translation-context"

export default function Home() {
  return (
    <TranslationProvider>
      <LandingPage />
    </TranslationProvider>
  )
}

