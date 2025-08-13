"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type BongoCatProps = {
  size?: "small" | "medium" | "large"
  interactive?: boolean
}

export default function BongoCat({ size = "medium", interactive = false }: BongoCatProps) {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (interactive) {
      const interval = setInterval(() => {
        setIsTyping((prev) => !prev)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [interactive])

  const sizeClasses = {
    small: "w-[180px] h-[140px]",
    medium: "w-[280px] h-[200px]",
    large: "w-[350px] h-[250px]",
  }

  const handleClick = () => {
    if (interactive) {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 1000)
    }
  }

  return (
    <motion.div
      className={`bongo-cat-container ${sizeClasses[size]} ${interactive ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      <div className="bongo-cat">
        <iframe
          src="https://giphy.com/embed/GeimqsH0TLDt4tScGw"
          width="100%"
          height="100%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          title="Bongo Cat"
        ></iframe>
      </div>
    </motion.div>
  )
}
