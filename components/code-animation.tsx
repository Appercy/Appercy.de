"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export default function CodeAnimation() {
  const { t } = useLanguage()
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentTypingLine, setCurrentTypingLine] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  const terminalLines = [
    {
      prompt: "appercy@debian:~$",
      command: "whoami",
      type: "command",
      delay: 800,
    },
    {
      text: "appercy",
      type: "output",
      delay: 300,
    },
    {
      text: "",
      type: "empty",
      delay: 200,
    },
    {
      prompt: "appercy@debian:~$",
      command: "cat /etc/skills",
      type: "command",
      delay: 600,
    },
    {
      text: "JavaScript, TypeScript, C#, PHP",
      type: "skill",
      delay: 200,
    },
    {
      text: "React, Vue, Next.js, Node.js",
      type: "skill",
      delay: 150,
    },
    {
      text: "Linux, Docker, PostgreSQL",
      type: "skill",
      delay: 150,
    },
    {
      text: "",
      type: "empty",
      delay: 200,
    },
    {
      prompt: "appercy@debian:~$",
      command: "systemctl status passion",
      type: "command",
      delay: 800,
    },
    {
      text: `● passion.service - ${t("terminal.passion")}`,
      type: "status-active",
      delay: 250,
    },
    {
      text: `   Active: active (running) since Mon 2024-01-15`,
      type: "status-info",
      delay: 150,
    },
    {
      text: "   Main PID: 1337 (gaming)",
      type: "status-info",
      delay: 150,
    },
    {
      text: "",
      type: "empty",
      delay: 200,
    },
    {
      prompt: "appercy@debian:~$",
      command: "ls -la ~/projects/",
      type: "command",
      delay: 600,
    },
    {
      text: "drwxr-xr-x 2 appercy appercy 4096 Jan 15 10:30 minecraft-server/",
      type: "directory",
      delay: 100,
    },
    {
      text: "drwxr-xr-x 2 appercy appercy 4096 Jan 15 10:31 fivem-resources/",
      type: "directory",
      delay: 100,
    },
    {
      text: "drwxr-xr-x 2 appercy appercy 4096 Jan 15 10:32 discord-bots/",
      type: "directory",
      delay: 100,
    },
    {
      text: "",
      type: "empty",
      delay: 200,
    },
    {
      prompt: "appercy@debian:~$",
      command: `echo '${t("terminal.ready")}'`,
      type: "command",
      delay: 700,
    },
    {
      text: t("terminal.ready"),
      type: "success",
      delay: 300,
    },
    {
      text: "",
      type: "empty",
      delay: 500,
    },
  ]

  // Auto-scroll to bottom when new content is added (only if autoScroll is enabled)
  useEffect(() => {
    if (terminalBodyRef.current && autoScroll) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [displayedLines, currentTypingLine, autoScroll])

  // Handle manual scrolling - disable auto-scroll if user scrolls up
  const handleScroll = () => {
    if (terminalBodyRef.current && !animationComplete) {
      const { scrollTop, scrollHeight, clientHeight } = terminalBodyRef.current
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px tolerance
      setAutoScroll(isAtBottom)
    }
  }

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Main animation sequence
  useEffect(() => {
    const runAnimation = () => {
      setDisplayedLines([])
      setCurrentTypingLine("")
      setCurrentLineIndex(0)
      setIsTyping(false)
      setAnimationComplete(false)
      setAutoScroll(true)

      const processLine = (index: number) => {
        if (index >= terminalLines.length) {
          // Animation complete - don't restart
          setAnimationComplete(true)
          setIsTyping(false)
          return
        }

        const line = terminalLines[index]

        setTimeout(
          () => {
            if (line.type === "command" && line.command) {
              // Show prompt first, then type command
              setIsTyping(true)
              setCurrentLineIndex(index)
              setCurrentTypingLine("")

              let charIndex = 0
              const typeNextChar = () => {
                if (charIndex < line.command!.length) {
                  setCurrentTypingLine(line.command!.substring(0, charIndex + 1))
                  charIndex++
                  // Faster typing speed
                  const typingSpeed = 30 + Math.random() * 40
                  setTimeout(typeNextChar, typingSpeed)
                } else {
                  // Finished typing command
                  setIsTyping(false)
                  setDisplayedLines((prev) => [...prev, `${line.prompt} ${line.command}`])
                  setCurrentTypingLine("")

                  // Process next line after a short delay
                  setTimeout(() => processLine(index + 1), 100)
                }
              }
              typeNextChar()
            } else {
              // Instantly show output/status lines
              setDisplayedLines((prev) => [...prev, line.text || ""])
              setCurrentLineIndex(index)

              // Process next line
              setTimeout(() => processLine(index + 1), line.delay)
            }
          },
          index === 0 ? 500 : line.delay,
        )
      }

      processLine(0)
    }

    runAnimation()
  }, [t]) // Re-run when language changes

  return (
    <div className="terminal-wrapper w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="terminal-container bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl h-[350px] flex flex-col"
      >
        {/* Terminal Header */}
        <div className="terminal-header h-10 bg-gray-800 flex items-center px-4 border-b border-gray-700 rounded-t-xl flex-shrink-0">
          <div className="flex space-x-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <div className="ml-4 text-xs text-gray-400 font-mono">appercy@debian: ~</div>
          <div className="ml-auto text-xs text-gray-500 font-mono">bash</div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          onScroll={handleScroll}
          className="terminal-body flex-1 p-4 font-mono text-sm bg-black rounded-b-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="space-y-0">
            {/* Display completed lines */}
            <AnimatePresence mode="popLayout">
              {displayedLines.map((line, index) => (
                <motion.div
                  key={`completed-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  className="leading-relaxed min-h-[1.5rem] flex items-start"
                >
                  {terminalLines[index]?.type === "empty" ? (
                    <span>&nbsp;</span>
                  ) : terminalLines[index]?.type === "command" ? (
                    <span>
                      <span className="text-green-400 font-bold">{terminalLines[index].prompt}</span>
                      <span className="text-white ml-1">{terminalLines[index].command}</span>
                    </span>
                  ) : (
                    <span className={`${getTerminalColor(terminalLines[index]?.type)} whitespace-pre-wrap break-all`}>
                      {line}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Currently typing line */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="leading-relaxed min-h-[1.5rem] flex items-start"
              >
                <span>
                  <span className="text-green-400 font-bold">{terminalLines[currentLineIndex]?.prompt}</span>
                  <span className="text-white ml-1">
                    {currentTypingLine}
                    <motion.span
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                      className="text-white"
                    >
                      █
                    </motion.span>
                  </span>
                </span>
              </motion.div>
            )}

            {/* Final prompt line when animation is complete */}
            {animationComplete && (
              <motion.div
                className="flex items-center leading-relaxed min-h-[1.5rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <span className="text-green-400 font-bold">appercy@debian:~$ </span>
                <motion.span
                  animate={{ opacity: showCursor ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="text-white ml-1"
                >
                  █
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Scroll indicator when user can scroll */}
          {!autoScroll && !animationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-4 right-4 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-mono border border-gray-600"
            >
              {t("terminal.scroll")}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function getTerminalColor(type: string): string {
  const colors = {
    command: "text-white",
    output: "text-cyan-300",
    skill: "text-yellow-300",
    "status-active": "text-green-300",
    "status-info": "text-blue-300",
    directory: "text-purple-300",
    success: "text-green-400 font-bold",
    prompt: "text-green-400 font-bold",
    empty: "text-transparent",
  }
  return colors[type as keyof typeof colors] || "text-gray-300"
}
