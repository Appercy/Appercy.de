"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import React from "react"
import { SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiLua, SiC, SiMysql, SiPostgresql, SiGnubash } from "react-icons/si"
import { FaPhp, FaJava, FaReact, FaVuejs, FaGitAlt, FaDocker, FaLinux } from "react-icons/fa"
import { VscTerminalPowershell, VscVscode } from "react-icons/vsc"
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import { PiFileCSharp } from "react-icons/pi"

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
        'Java',
      ],
      icon: "💻",
    },
    {
      title: t("skills.frameworks"),
      skills: ["React", "Vue", "Next.js", "Tailwind CSS"],
      icon: "🛠️",
    },
    {
      title: t("skills.tools"),
      skills: ["Git", "PostgreSQL", "VS Code", "Docker", "Linux"],
      icon: "🔧",
    },
    {
      title: t("skills.currently"),
      skills: ["Vue", "Next.js", "C"],
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

  // Define minimalistic SVG icons for each language
  const languageIcons: Record<string, React.ReactElement> = {
    JavaScript: <SiJavascript size={20} />,
    TypeScript: <SiTypescript size={20} />,
    Python: <SiPython size={20} />,
    'C#': <PiFileCSharp size={20} />,
    PHP: <FaPhp size={20} />,
    HTML: <SiHtml5 size={20} />,
    CSS: <SiCss3 size={20} />,
    Lua: <SiLua size={20} />,
    C: <SiC size={20} />,
    SQL: <SiMysql size={20} />,
    PostgreSQL: <SiPostgresql size={20} />,
    Bash: <SiGnubash size={20} />,
    PowerShell: <VscTerminalPowershell size={20} />,
    Java: <FaJava size={20} />,
    React: <FaReact size={20} />,
    Vue: <FaVuejs size={20} />,
    Git: <FaGitAlt size={20} />,
    'VS Code': <VscVscode size={20} />,
    Docker: <FaDocker size={20} />,
    Linux: <FaLinux size={20} />,
    'Next.js': <RiNextjsFill size={20} />,
    'Tailwind CSS': <RiTailwindCssFill size={20} />,
  }
  const languageColors: Record<string, string> = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    'C#': '#9B4F96',
    PHP: '#777BB4',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Lua: '#000080',
    C: '#A8B9CC',
    SQL: '#4479A1',
    PostgreSQL: '#336791',
    Bash: '#4EAA25',
    PowerShell: '#012456',
    Java: '#f89820',
    React: '#61DAFB',
    Vue: '#42b883',
    Git: '#F05032',
    'VS Code': '#007ACC',
    Docker: '#2496ED',
    Linux: '#FCC624',
    'Next.js': '#000',
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
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm flex items-center gap-2 transition-colors duration-300"
                    whileHover={{ color: languageColors[skill] || '#7c3aed', backgroundColor: '#f3e8ff' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {languageIcons[skill] || null}
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

