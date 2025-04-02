"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const codeLines = [
    "function greet() {",
    "  console.log('Hello, I'm Ludaro!');",
    "  return {",
    "    skills: ['JS', 'TS', 'React', 'Next.js'],",
    "    passion: 'Web & FiveM Development'",
    "  };",
    "}",
  ]

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    // Typing effect
    const typingInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < codeLines.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(typingInterval)
    }
  }, [])

  return (
    <div className="code-animation-container w-[350px] h-[250px] bg-gray-900 rounded-xl shadow-xl overflow-hidden">
      <div className="code-header h-8 bg-gray-800 flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-gray-400">ludaro.js</div>
      </div>
      <div className="code-body p-4 font-mono text-sm">
        {codeLines.slice(0, currentLine + 1).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <span className="text-gray-500 mr-4">{index + 1}</span>
            <span className={`${getCodeColor(line)}`}>
              {line}
              {index === currentLine && showCursor && <span className="text-white">|</span>}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function getCodeColor(line: string): string {
  if (line.includes("function")) {
    return "text-purple-400"
  } else if (line.includes("console.log")) {
    return "text-blue-400"
  } else if (line.includes("return")) {
    return "text-yellow-400"
  } else if (line.includes("skills") || line.includes("passion")) {
    return "text-green-400"
  } else {
    return "text-white"
  }
}

