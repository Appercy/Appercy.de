"use client"

import { useLanguage } from "@/components/language-provider"
import { m, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Gamepad2, Trophy, Clock } from "lucide-react"

type Game = {
  appid: number
  name: string
  img_icon_url: string
  img_url: string
  playtime_forever: number
}

export default function Games() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSteamGames = async () => {
      try {
        const response = await fetch("/api/steam")
        if (response.ok) {
          const data = await response.json()
          setGames(data.games)
        } else {
          // Fallback to mock data if API fails
          setGames(getFallbackGames())
        }
      } catch (error) {
        console.error("Error fetching Steam games:", error)
        setGames(getFallbackGames())
      } finally {
        setLoading(false)
      }
    }

    fetchSteamGames()
  }, [])

  const getFallbackGames = (): Game[] => {
    return [
      {
        appid: 570,
        name: "Dota 2",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/0bbb630d63262dd66d2fdd0f7d37e8661a410075.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
        playtime_forever: 5000,
      },
      {
        appid: 730,
        name: "Counter-Strike 2",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/730/69f7ebe2735c366c65c0b33dae00e12dc40edbe4.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
        playtime_forever: 2500,
      },
      {
        appid: 271590,
        name: "Grand Theft Auto V",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/271590/e447e82f8b0c67f9e001498eb0b41408b1a4f5e9.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
        playtime_forever: 1200,
      },
      {
        appid: 1172470,
        name: "Apex Legends",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1172470/a75248e4d7f229ac7d971121e5bd0c0e5aae96a9.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
        playtime_forever: 900,
      },
      {
        appid: 578080,
        name: "PUBG: BATTLEGROUNDS",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/578080/2a9b1af8faf9cfcb6aaa5b3f140f86db0a346aaa.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
        playtime_forever: 800,
      },
      {
        appid: 1091500,
        name: "Cyberpunk 2077",
        img_icon_url:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1091500/9aaf5e3d95f2ea3c3d5f9a4e1d07cdbe2a0f56c9.jpg",
        img_url: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        playtime_forever: 700,
      },
    ]
  }

  const favoriteGames = [
    {
      name: "League of Legends",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Valorant",
      image:
        "https://cdn.vectorstock.com/i/1000v/37/87/valorant-game-logo-icon-eps-10-gaming-streamer-vector-33193787.jpg",
    },
    {
      name: "Portal 2",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
    },
    {
      name: "It Takes Two",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg",
    },
    {
      name: "Split Fiction",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2001120/header.jpg",
    },
    {
      name: 'Payday 2',
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/218620/header.jpg",
    },
    {
      name: 'Warframe',
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/header.jpg",
    },
    {
      name: 'XCOM 2',
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/header.jpg",
    }
  ]

  return (
    <section id="games" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("games.title")}</h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center mb-8">
              <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("games.favorites")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {favoriteGames.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="relative h-32 w-full">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <span className="text-white font-medium">{game.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("games.steam")}</h3>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Gamepad2 size={40} className="text-purple-500" />
                </motion.div>
                <p className="text-lg">{t("games.loading")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {games.map((game, index) => (
                  <motion.a
                    key={index}
                    href={`https://store.steampowered.com/app/${game.appid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="relative h-32 w-full">
                      <img
                        src={game.img_url || "/placeholder.svg"}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{game.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor(game.playtime_forever / 60)} hrs
                        </span>
                      </div>
                      {/* <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 dark:bg-purple-400"
                          style={{ width: `${Math.min(100, game.playtime_forever / 50)}%` }}
                        ></div>
                      </div> */}
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

