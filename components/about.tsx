"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function About() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const details = [
    { label: t("about.age"), value: "25" },
    { label: t("about.location"), value: "Germany" },
    { label: t("about.education"), value: t("about.education.value") },
    { label: t("about.discord"), value: "@appercycat" },
  ]

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("about.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 mb-8 lg:mb-0"
          >
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {t("about.description")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">{detail.label}</h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{detail.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:w-2/5 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-30" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.div
                  className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Image
                        src="/images/poro-logo.png"
                        alt="Appercy Poro Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Appercy</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm">
                      Appercy@Appercy.de
                    </span>
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <a
                      href="https://github.com/Appercy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-github"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle"
                      >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

