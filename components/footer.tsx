"use client"

import { useLanguage } from "@/components/language-provider"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const { t } = useLanguage()
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handlePoroClick = () => {
    setShowEasterEgg(true)
    setTimeout(() => setShowEasterEgg(false), 3000)

    setClickCount((prev) => {
      const newCount = prev + 1
      // Easter egg: If clicked 10 times, redirect to rickroll
      if (newCount === 10) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
        return 0
      }
      return newCount
    })
  }

  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
              <Image
                src="/images/poro-logo.png"
                alt="Appercy Poro Logo"
                width={40}
                height={40}
                className="mr-4 cursor-pointer"
                onClick={handlePoroClick}
              />
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400">{t("footer.copyright")}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t("footer.meme")} 🚀</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              <Link href="#impressum" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Impressum
              </Link>
              <span className="mx-2">•</span>
              <span className="text-gray-400 dark:text-gray-600 italic">{t("easter.hint")}</span>
            </p>
          </div>
        </div>
      </div>

      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {clickCount < 9
                ? `You found a secret Poro! Click ${10 - clickCount} more times for a surprise!`
                : "One more click for a special surprise!"}
            </p>
          </div>
        </motion.div>
      )}

      {/* Hidden Poros for Easter Eggs */}
      <div className="hidden-poro top-1/3 left-10" style={{ transform: "scale(0.5)" }}>
        <Image src="/images/poro-logo.png" alt="Hidden Poro" width={40} height={40} />
      </div>
      <div className="hidden-poro bottom-1/4 right-10" style={{ transform: "scale(0.5)" }}>
        <Image src="/images/poro-logo.png" alt="Hidden Poro" width={40} height={40} />
      </div>
    </footer>
  )
}
