"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Impressum() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="impressum" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {language === "de" ? "Impressum" : "Legal Notice"}
        </h2>
        <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8"
      >
        {language === "de" ? (
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Angaben gemäß § 5 TMG</h3>
          <p>
            Inhaber: Lukas Geißbauer
            <br />
            Kontaktadresse: c/o RA Matutis
            <br />
            Straße: Berliner Straße 5
            <br />
            PLZ: 14467 Potsdam
            <br />
            Land: Deutschland
          </p>
          </div>

          <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kontakt</h3>
          <p>
            E-Mail: Appercy@Appercy.de
          </p>
          </div>
        </div>
        ) : (
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Information according to § 5 TMG
          </h3>
          <p>
            Owner: Lukas Geißbauer
            <br />
            Contact Address: c/o RA Matutis
            <br />
            Street: Berliner Straße 5
            <br />
            ZIP Code: 14467 Potsdam
            <br />
            Country: Germany
          </p>
          </div>

          <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h3>
          <p>
            Email: Appercy@Appercy.de
          </p>
          </div>
        </div>
        )}
      </motion.div>
      </div>
    </section>
  )
}

