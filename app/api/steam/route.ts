import { NextResponse } from "next/server"

// Steam API key
const STEAM_API_KEY = "71D6C3C8B64FC8D6A36596E422E827DD"
const STEAM_ID = "76561198123456789" // Replace with your actual Steam ID

export async function GET() {
  try {
    // Get owned games
    const ownedGamesResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=true&include_played_free_games=true`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!ownedGamesResponse.ok) {
      throw new Error("Failed to fetch Steam games")
    }

    const ownedGamesData = await ownedGamesResponse.json()

    // Process and sort games by playtime
    const games = ownedGamesData.response.games || []
    const processedGames = games
      .map((game: any) => ({
        appid: game.appid,
        name: game.name,
        playtime_forever: game.playtime_forever,
        img_icon_url: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        img_url: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      }))
      .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
      .slice(0, 6) // Get top 6 games by playtime

    return NextResponse.json({ games: processedGames })
  } catch (error) {
    console.error("Error fetching Steam data:", error)
    return NextResponse.json({ error: "Failed to fetch Steam data" }, { status: 500 })
  }
}
