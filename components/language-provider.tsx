"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "IT Specialist & Developer",
    "hero.subtitle": "Passionate about web technologies, gaming, and memes",
    "hero.cta": "Get to know me",

    // About
    "about.title": "About Me",
    "about.description":
      "I'm a 25-year-old developer from Germany who completed my education as an IT specialist for system integration in 2024. I'm passionate about coding, learning new technologies, and creating fun projects. When I'm not coding, I enjoy playing games and exploring new tech trends.",
    "about.age": "Age",
    "about.location": "Location",
    "about.education": "Education",
    "about.education.value": "IT Specialist for System Integration",
    "about.job": "Current Job",
    "about.job.value": "Working as a Developer",
    "about.discord": "Discord",

    // Skills
    "skills.title": "My Skills",
    "skills.languages": "Programming Languages",
    "skills.frameworks": "Frameworks & Libraries",
    "skills.tools": "Tools & Technologies",
    "skills.currently": "Currently Learning",

    // Projects
    "projects.title": "My Projects",
    "projects.wiki.title": "Ludaro Wiki",
    "projects.wiki.description":
      "My personal wiki where I explain how to start with FiveM and save useful code snippets.",
    "projects.wiki.cta": "Visit Wiki",
    "projects.github.cta": "View on GitHub",
    "projects.github.title": "GitHub Repositories",
    "projects.loading": "Loading repositories...",

    // Games
    "games.title": "Gaming",
    "games.favorites": "Favorite Games",
    "games.steam": "My Steam Games",
    "games.loading": "Loading games...",

    // Contact
    "contact.title": "Get In Touch",
    "contact.description": "Feel free to reach out to me via email, Discord, or check out my GitHub profile.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.discord": "Discord",

    // Footer
    "footer.copyright": "© 2024 Ludaro. All rights reserved.",
    "footer.meme": "Powered by coffee and memes",

    // Easter Eggs
    "easter.hint": "Try the Konami code or type 'rick'",
  },
  de: {
    // Hero
    "hero.greeting": "Hallo, ich bin",
    "hero.title": "IT-Spezialist & Entwickler",
    "hero.subtitle": "Begeistert von Webtechnologien, Gaming und Memes",
    "hero.cta": "Lerne mich kennen",

    // About
    "about.title": "Über Mich",
    "about.description":
      "Ich bin ein 25-jähriger Entwickler aus Deutschland, der 2024 seine Ausbildung zum IT-Systemintegrator abgeschlossen hat. Ich bin begeistert vom Programmieren, lerne gerne neue Technologien und erstelle spaßige Projekte. Wenn ich nicht programmiere, spiele ich gerne Videospiele und erkunde neue Techniktrends.",
    "about.age": "Alter",
    "about.location": "Standort",
    "about.education": "Ausbildung",
    "about.education.value": "IT-Spezialist für Systemintegration",
    "about.job": "Aktueller Job",
    "about.job.value": "Tätig als Entwickler",
    "about.discord": "Discord",

    // Skills
    "skills.title": "Meine Fähigkeiten",
    "skills.languages": "Programmiersprachen",
    "skills.frameworks": "Frameworks & Bibliotheken",
    "skills.tools": "Tools & Technologien",
    "skills.currently": "Aktuell am Lernen",

    // Projects
    "projects.title": "Meine Projekte",
    "projects.wiki.title": "Ludaro Wiki",
    "projects.wiki.description":
      "Mein persönliches Wiki, in dem ich erkläre, wie man mit Developement in FiveM beginnt",
    "projects.wiki.cta": "Wiki besuchen",
    "projects.github.cta": "Auf GitHub ansehen",
    "projects.github.title": "GitHub Repositories",
    "projects.loading": "Lade Repositories...",

    // Games
    "games.title": "Gaming",
    "games.favorites": "Lieblingsspiele",
    "games.steam": "Meine Steam-Spiele",
    "games.loading": "Lade Spiele...",

    // Contact
    "contact.title": "Kontakt",
    "contact.description": "Kontaktiere mich gerne per E-Mail, Discord oder schau dir mein GitHub-Profil an.",
    "contact.email": "E-Mail",
    "contact.github": "GitHub",
    "contact.discord": "Discord",

    // Footer
    "footer.copyright": "© 2024 Ludaro. Alle Rechte vorbehalten.",
    "footer.meme": "Angetrieben durch Kaffee und Memes",

    // Easter Eggs
    "easter.hint": "Versuche den Konami-Code oder tippe 'rick'",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check browser language
    const browserLang = navigator.language.split("-")[0] as Language
    if (browserLang === "de") {
      setLanguage("de")
    }

    // Check localStorage
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "de")) {
      setLanguage(storedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

