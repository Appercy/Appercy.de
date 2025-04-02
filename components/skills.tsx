"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Skills() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      title: t("skills.languages"),
      skills: [
        "JavaScript",
        "TypeScript",
        "C#",
        "PHP",
        "HTML",
        "CSS",
        "Python",
        "PowerShell",
        "Bash",
        "SQL",
        "Lua",
        "C",
        'Java',
      ],
      icon: "💻",
    },
    {
      title: t("skills.frameworks"),
      skills: ["React", "Vue", "Next.js", "Node.js", "Express", "Tailwind CSS"],
      icon: "🛠️",
    },
    {
      title: t("skills.tools"),
      skills: ["Git", "PostgreSQL", "VS Code", "Docker", "Linux"],
      icon: "🔧",
    },
    {
      title: t("skills.currently"),
      skills: ["Vue.js", "Next.js"],
      icon: "📚",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("skills.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    variants={item}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "#f3e8ff" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

