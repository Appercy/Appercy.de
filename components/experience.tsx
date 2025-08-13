"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Award, Code2 } from "lucide-react"

export default function Experience() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: t("experience.current.title"),
      company: t("experience.current.company"),
      location: "Germany",
      period: "2024 - Present",
      description: t("experience.current.description"),
      type: "work",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      title: t("experience.apprenticeship.title"),
      company: t("experience.apprenticeship.company"),
      location: "Germany",
      period: "2021 - 2024",
      description: t("experience.apprenticeship.description"),
      type: "education",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: t("experience.freelance.title"),
      company: t("experience.freelance.company"),
      location: "Remote",
      period: "2020 - 2021",
      description: t("experience.freelance.description"),
      type: "work",
      icon: <Code2 className="w-5 h-5" />,
    },
  ]

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("experience.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{t("experience.subtitle")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                    exp.type === "work"
                      ? "bg-purple-600 border-purple-200 dark:border-purple-800"
                      : "bg-green-600 border-green-200 dark:border-green-800"
                  }`}
                ></div>

                {/* Content */}
                <div className="ml-16 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          exp.type === "work"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        }`}
                      >
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
