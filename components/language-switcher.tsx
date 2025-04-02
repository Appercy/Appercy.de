"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "bg-purple-600 hover:bg-purple-700" : ""}
      >
        EN
      </Button>
      <Button
        variant={language === "de" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("de")}
        className={language === "de" ? "bg-purple-600 hover:bg-purple-700" : ""}
      >
        DE
      </Button>
    </div>
  )
}

