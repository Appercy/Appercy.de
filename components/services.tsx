"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Gamepad2, Server, Code2, Users, Wrench, Zap } from "lucide-react"

export default function Services() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      title: t("services.gamedev.title"),
      description: t("services.gamedev.description"),
      icon: <Code2 className="w-8 h-8" />,
      color: "purple",
      features: [t("services.gamedev.feature1"), t("services.gamedev.feature2"), t("services.gamedev.feature3")],
    },
    {
      title: t("services.hosting.title"),
      description: t("services.hosting.description"),
      icon: <Server className="w-8 h-8" />,
      color: "blue",
      features: [t("services.hosting.feature1"), t("services.hosting.feature2"), t("services.hosting.feature3")],
    },
    {
      title: t("services.gaming.title"),
      description: t("services.gaming.description"),
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "green",
      features: [t("services.gaming.feature1"), t("services.gaming.feature2"), t("services.gaming.feature3")],
    },
    {
      title: t("services.community.title"),
      description: t("services.community.description"),
      icon: <Users className="w-8 h-8" />,
      color: "orange",
      features: [t("services.community.feature1"), t("services.community.feature2"), t("services.community.feature3")],
    },
    {
      title: t("services.support.title"),
      description: t("services.support.description"),
      icon: <Wrench className="w-8 h-8" />,
      color: "red",
      features: [t("services.support.feature1"), t("services.support.feature2"), t("services.support.feature3")],
    },
    {
      title: t("services.performance.title"),
      description: t("services.performance.description"),
      icon: <Zap className="w-8 h-8" />,
      color: "yellow",
      features: [
        t("services.performance.feature1"),
        t("services.performance.feature2"),
        t("services.performance.feature3"),
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        hover: "hover:border-purple-300 dark:hover:border-purple-700",
      },
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        hover: "hover:border-blue-300 dark:hover:border-blue-700",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        hover: "hover:border-green-300 dark:hover:border-green-700",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800",
        hover: "hover:border-orange-300 dark:hover:border-orange-700",
      },
      red: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800",
        hover: "hover:border-red-300 dark:hover:border-red-700",
      },
      yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
        border: "border-yellow-200 dark:border-yellow-800",
        hover: "hover:border-yellow-300 dark:hover:border-yellow-700",
      },
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("services.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 overflow-hidden`}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="p-6">
                  <div className={`w-16 h-16 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <div className={colorClasses.text}>{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${colorClasses.text.replace("text-", "bg-")} mr-3`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("services.cta.title")}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t("services.cta.description")}</p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t("services.cta.button")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
