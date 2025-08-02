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
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

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

  // Example repo to embed
  const githubRepo = {
    username: "Appercy",
    repo: "Appercy.de",
  }

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

  // GitHub theme based on language and dark mode
  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  const githubTheme = isDark ? "github_dark" : "github"

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

        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center mb-20 w-full">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <img
              src="https://github-readme-stats.vercel.app/api?username=Appercy&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=highcontrast&locale=en&hide_border=false"
              height="150"
              alt="stats graph"
            />
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs?username=Appercy&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=highcontrast&hide_border=false"
              height="150"
              alt="languages graph"
            />
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=Appercy&bg_color=black&color=ffffff&line=32a852&title_color=ffffff&area=true&hide_border=true&hide_title=false&theme=tokyo-night"
              height="150"
              alt="activity-graph graph"
            />
          </div>
          <div className="mt-6">
            <a
              href={`https://github.com/Appercy`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
            >
              <Github size={18} className="mr-2" />
              {t("projects.github.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

