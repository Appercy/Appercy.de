"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import CodeAnimation from "@/components/code-animation"

export default function Hero() {
  const { t } = useLanguage()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 z-0" />

      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-300 dark:bg-purple-700 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-400 dark:bg-purple-800 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
              >
                <Image src="/images/poro-logo.png" alt="Ludaro Poro Logo" width={90} height={90} className="mr-4" />
              </motion.div>
              <div>
               
                <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-2">{t("hero.greeting")}</h2>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
                  <span className="text-purple-600 dark:text-purple-400">Ludaro</span>
                </h1>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {t("hero.title")}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t("hero.cta")}
            </Button>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative z-10 flex items-center justify-center">
                {showAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      duration: 1,
                    }}
                  >
                    <CodeAnimation />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <ChevronDown size={32} className="text-purple-600 dark:text-purple-400" />
        </motion.div>
      </div>
    </section>
  )
}

