import { WebNav } from "@/components/layout/web-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Hero } from "@/components/sections/hero"
import { BigIdea } from "@/components/sections/big-idea"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Projects2 } from "@/components/sections/projects2"
import { About } from "@/components/sections/about"
import { ContactCTA } from "@/components/sections/contact-cta"
import { Footer } from "@/components/sections/footer"

const Home = () => {
  return (
    <>
      <WebNav />
      <MobileNav />

      <main
        id="top"
        data-scale-container
        className="mx-auto min-h-screen max-w-[1380px] px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-20"
      >
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: The Big Idea */}
        <BigIdea />

        {/* Section 03: What We Do (Serpentine orbital journey) */}
        <Services />

        {/* Section 04: How We Think (Engineering methodology) */}
        <Process />

        {/* Section 05: Projects (Interactive list & preview showcase) */}
        <Projects2 />

        {/* Section 06: Who We Are (Studio manifesto & values) */}
        <About />

        {/* Section 07: Start a Conversation */}
        <ContactCTA />

        {/* Section 08: Footer */}
        <Footer />
      </main>
    </>
  )
}

export default Home
