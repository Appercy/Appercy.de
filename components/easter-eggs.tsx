"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type EasterEggType = "konami" | "bongo" | "nyan"

export default function EasterEggs({ type }: { type: EasterEggType }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (type === "nyan") {
      const interval = setInterval(() => {
        setPosition({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [type])

  if (type === "konami") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
        onClick={() => document.body.click()}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-3xl font-bold text-white mb-2">Konami Code Activated!</h2>
          <p className="text-xl text-gray-300">You found an easter egg!</p>
          <p className="text-sm text-gray-400 mt-4">Try typing "rick" for another surprise...</p>
        </motion.div>
      </motion.div>
    )
  }

  if (type === "bongo") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 right-0 mb-4 mr-4 z-50"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <iframe
            src="https://giphy.com/embed/GeimqsH0TLDt4tScGw"
            width="200"
            height="150"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Bongo Cat"
          ></iframe>
        </div>
      </motion.div>
    )
  }

  if (type === "nyan") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          x: position.x,
          y: position.y,
        }}
        transition={{ duration: 0.5 }}
        className="fixed z-50"
        style={{ left: position.x, top: position.y }}
      >
        <div className="text-4xl">🌈😺</div>
      </motion.div>
    )
  }

  return null
}
