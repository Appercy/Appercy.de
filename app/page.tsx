"use client"

import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Games from "@/components/games"
import Contact from "@/components/contact"
import Impressum from "@/components/impressum"
import Footer from "@/components/footer"
import EasterEggs from "@/components/easter-eggs"
import { motion, useScroll } from "framer-motion"

export default function Home() {
  const { language } = useLanguage()
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [showRickroll, setShowRickroll] = useState(false)
  const [konami, setKonami] = useState<string[]>([])
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  const { scrollY } = useScroll()
  const ref = useRef<HTMLDivElement>(null)

  // Secret code for rickroll: type "rick"
  const [rickCode, setRickCode] = useState<string[]>([])
  const rickRollCode = ["r", "i", "c", "k"]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code detection
      const newKonami = [...konami, e.key]
      if (newKonami.length > konamiCode.length) {
        newKonami.shift()
      }
      setKonami(newKonami)

      if (newKonami.join(",") === konamiCode.join(",")) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 5000)
        setKonami([])
      }

      // Rickroll code detection
      const newRickCode = [...rickCode, e.key.toLowerCase()]
      if (newRickCode.length > rickRollCode.length) {
        newRickCode.shift()
      }
      setRickCode(newRickCode)

      if (newRickCode.join("") === rickRollCode.join("")) {
        setShowRickroll(true)
        setRickCode([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [konami, rickCode])

  return (
    <main
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="fixed top-6 right-6 z-50 flex items-center space-x-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-2 rounded-full shadow-md">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Games /> */}
        <Contact />
        <Impressum />
        <Footer />
      </motion.div>

      {showEasterEgg && <EasterEggs type="konami" />}

      {/* Rickroll Easter Egg */}
      {showRickroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setShowRickroll(false)}
        >
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Rick Astley - Never Gonna Give You Up"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button className="absolute top-4 right-4 text-white text-xl" onClick={() => setShowRickroll(false)}>
            ✕
          </button>
        </motion.div>
      )}
    </main>
  )
}

