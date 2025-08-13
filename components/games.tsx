"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
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
        "https://cdn.vox-cdn.com/thumbor/UbUWVPevKlUMfUweJT4vnQm5Cso=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19587205/lol.jpg",
    },
    {
      name: "Counter-Strike 2",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    },
    {
      name: "Valorant",
      image:
        "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png",
    },
    {
      name: "Minecraft",
      image: "https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023_Updates_Thumbnail_1200x675.jpg",
    },
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
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 dark:bg-purple-400"
                          style={{ width: `${Math.min(100, game.playtime_forever / 50)}%` }}
                        ></div>
                      </div>
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
