import { Hero } from "@/components/sections/hero"
import { Ecosystem } from "@/components/sections/ecosystem"
import { Capabilities } from "@/components/sections/capabilities"
import { Approach } from "@/components/sections/approach"
import { About } from "@/components/sections/about"
import { ContactCTA } from "@/components/sections/contact-cta"
import Integrations from "@/components/ui/integrations-4-2"

const Home = () => {
  return (
    <>
      {/* Section 01: Hero */}
      <Hero />

      {/* Section 02: Intelligent engineering ecosystem */}
      <Ecosystem />

      {/* Section 03: Capabilities (Editorial feature showcases) */}
      <Capabilities />

      {/* Section 04: Our Approach (Convergence diagram) */}
      <Approach />

      {/* Section 05: Who We Are (Editorial statement) */}
      <About />

      {/* Integrations */}
      <section id="integrations" className="mb-28 overflow-x-clip md:mb-36">
        <Integrations />
      </section>

      {/* Section 06: Start a Conversation */}
      <ContactCTA />
    </>
  )
}

export default Home
