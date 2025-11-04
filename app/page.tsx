import Header from "@/components/header"
import Hero from "@/components/hero"
import Mission from "@/components/missions"
import Stats from "@/components/stats"
import Solutions from "@/components/solution"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Stats />
      <Solutions />
      <CTA />
      <Footer />
      <Chatbot/>
    </main>
  )
}
