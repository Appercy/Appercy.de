"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import CodeAnimation from "@/components/code-animation"
import { AnimatePresence } from "framer-motion"

export default function Hero() {
  const { t } = useLanguage()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 z-0" />

      {/* Enhanced background patterns */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-300 dark:bg-purple-700 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-400 dark:bg-purple-800 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative flex-1 flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{
                  rotate: [0, -10, 0, 10, 0],
                  scale: 1,
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 },
                  scale: { duration: 0.5 },
                }}
              >
                <Image src="/images/poro-logo.png" alt="Appercy Poro Logo" width={90} height={90} className="mr-4" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="text-purple-600 dark:text-purple-400">Appercy</span>
                </motion.h1>
                <motion.h2
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {t("hero.greeting")}
                </motion.h2>
              </div>
            </div>

            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {t("hero.title")}
            </motion.h3>

            <motion.p
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t("hero.cta")}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Terminal Section - Full Width Below */}
        <motion.div
          className="w-full flex justify-center pb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div className="w-full max-w-5xl">
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    duration: 1,
                  }}
                >
                  <CodeAnimation />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <ChevronDown size={32} className="text-purple-600 dark:text-purple-400 cursor-pointer" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
