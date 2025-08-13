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
                  Appercy
                  <br />
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kontakt</h3>
                <p>
                  E-Mail: appercy@appercy.de
                  <br />
                  Discord: apperycat
                  <br />
                  GitHub: appercy
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Haftungsausschluss</h3>
                <p className="text-sm">
                  Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                  und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
                </p>
                <p className="text-sm mt-2">
                  Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                  forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
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
                  Appercy
                  <br />
                  Sample Street 123
                  <br />
                  12345 Sample City
                  <br />
                  Germany
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h3>
                <p>
                  Email: appercy@appercy.de
                  <br />
                  Discord: apperycat
                  <br />
                  GitHub: appercy
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Disclaimer</h3>
                <p className="text-sm">
                  The contents of this site were created with the utmost care. However, I cannot guarantee the accuracy,
                  completeness, and timeliness of the content.
                </p>
                <p className="text-sm mt-2">
                  As a service provider, I am responsible for my own content on these pages in accordance with § 7
                  paragraph 1 TMG. According to §§ 8 to 10 TMG, however, I am not obligated to monitor transmitted or
                  stored third-party information or to investigate circumstances that indicate illegal activity.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
