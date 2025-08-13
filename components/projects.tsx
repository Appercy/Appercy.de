"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Code } from "lucide-react"
import { useEffect, useState } from "react"

type Repository = {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
}

export default function Projects() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Appercy/repos")
        if (response.ok) {
          const data = await response.json()
          setRepos(data)
        }
      } catch (error) {
        console.error("Error fetching repositories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const projects = [
    {
      title: t("projects.wiki.title"),
      description: t("projects.wiki.description"),
      link: "https://wiki.Appercy.de",
      linkText: t("projects.wiki.cta"),
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Language colors for GitHub repos
  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-200 text-yellow-800",
    TypeScript: "bg-blue-200 text-blue-800",
    Python: "bg-green-200 text-green-800",
    "C#": "bg-purple-200 text-purple-800",
    PHP: "bg-indigo-200 text-indigo-800",
    HTML: "bg-orange-200 text-orange-800",
    CSS: "bg-pink-200 text-pink-800",
    Lua: "bg-blue-200 text-blue-800",
    C: "bg-gray-200 text-gray-800",
    default: "bg-gray-200 text-gray-800",
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("projects.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{project.description}</p>
                <div className="flex space-x-4">
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {project.linkText}
                  </Button>
                  <Button
                    as="a"
                    href="https://github.com/Appercy"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Github size={16} className="mr-2" />
                    {t("projects.github.cta")}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            {t("projects.github.title")}
          </h3>

          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Code size={40} className="text-purple-500" />
              </motion.div>
              <p className="text-lg">{t("projects.loading")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-xl font-medium text-purple-600 dark:text-purple-400 mb-3">{repo.name}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 h-12 overflow-hidden">
                    {repo.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center mb-5">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        languageColors[repo.language as keyof typeof languageColors] || languageColors.default
                      }`}
                    >
                      {repo.language || "Unknown"}
                    </span>
                    <div className="flex space-x-4 text-gray-600 dark:text-gray-400 text-xs">
                      <div className="flex items-center">
                        <Star size={14} className="mr-1" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center">
                        <GitFork size={14} className="mr-1" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                  <Button
                    as="a"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                  >
                    <Github size={14} className="mr-2" />
                    View Repository
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
