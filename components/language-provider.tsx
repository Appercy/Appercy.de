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
    "hero.subtitle": "Passionate about IT, gaming, and technology",
    "hero.cta": "Get to know me",

    // Terminal
    "terminal.passion": "IT & Gaming",
    "terminal.ready": "Ready for opportunities!",
    "terminal.scroll": "Scroll down to follow",

    // About
    "about.title": "About Me",
    "about.description":
      "I'm a 25-year-old IT enthusiast from Germany who completed my education as an IT specialist for system integration in 2024. I'm passionate about gaming, hosting game servers, developing for games, and exploring new technologies. I mainly work with Minecraft and FiveM servers, helping communities with their gaming needs. Currently looking for new opportunities in the IT field!",
    "about.age": "Age",
    "about.location": "Location",
    "about.education": "Education",
    "about.education.value": "IT Specialist for System Integration",
    "about.status": "Status",
    "about.status.value": "Looking for IT Opportunities",
    "about.discord": "Discord",
    "about.availability": "Available for Work",
    "about.zsx.title": "ZSX Community",
    "about.zsx.role": "Hobby Project",
    "about.zsx.description":
      "Contributing to the ZSX gaming community in my free time, helping with technical support and server management as a hobby project.",
    "about.zsx.link": "Visit ZSX",

    // Skills
    "skills.title": "My Skills",
    "skills.languages": "Programming Languages",
    "skills.frameworks": "Frameworks & Libraries",
    "skills.tools": "Tools & Technologies",
    "skills.currently": "Currently Learning",

    // Contact
    "contact.title": "Get In Touch",
    "contact.description":
      "Feel free to reach out to me via email, Discord, or check out my GitHub profile. I'm open to job opportunities and collaborations!",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.discord": "Discord",

    // Footer
    "footer.copyright": "© 2024 Appercy. All rights reserved.",
    "footer.meme": "Powered by coffee and memes",

    // Easter Eggs
    "easter.hint": "Try the Konami code or type 'rick'",

    // Services
    "services.title": "What I Do",
    "services.subtitle": "Gaming and IT services I'm passionate about in my free time",
    "services.gamedev.title": "Game Development",
    "services.gamedev.description": "Creating mods, plugins, and custom solutions for games like FiveM and Minecraft.",
    "services.gamedev.feature1": "FiveM Scripts & Resources",
    "services.gamedev.feature2": "Minecraft Plugins",
    "services.gamedev.feature3": "Custom Game Tools",
    "services.hosting.title": "Game Server Management",
    "services.hosting.description": "Managing and maintaining Minecraft and FiveM servers for optimal performance.",
    "services.hosting.feature1": "Minecraft Server Setup",
    "services.hosting.feature2": "FiveM Server Configuration",
    "services.hosting.feature3": "Performance Monitoring",
    "services.gaming.title": "Gaming Projects",
    "services.gaming.description": "Working on various gaming-related projects and helping gaming communities.",
    "services.gaming.feature1": "Community Projects",
    "services.gaming.feature2": "Gaming Events",
    "services.gaming.feature3": "Player Support",
    "services.community.title": "Community Building",
    "services.community.description": "Building and managing gaming communities and Discord servers.",
    "services.community.feature1": "Discord Bot Development",
    "services.community.feature2": "Community Events",
    "services.community.feature3": "Member Engagement",
    "services.support.title": "Server Support",
    "services.support.description": "Helping other server owners with technical issues and server optimization.",
    "services.support.feature1": "Technical Troubleshooting",
    "services.support.feature2": "Server Configuration Help",
    "services.support.feature3": "Performance Optimization",
    "services.performance.title": "Performance Optimization",
    "services.performance.description": "Optimizing game servers and applications for the best performance.",
    "services.performance.feature1": "Server Tuning",
    "services.performance.feature2": "Resource Management",
    "services.performance.feature3": "Lag Reduction",
    "services.cta.title": "Looking for IT Opportunities",
    "services.cta.description":
      "I'm actively seeking new opportunities in IT and would love to discuss potential roles or projects!",
    "services.cta.button": "Get In Touch",
  },
  de: {
    // Hero
    "hero.greeting": "Hallo, ich bin",
    "hero.title": "IT-Spezialist & Entwickler",
    "hero.subtitle": "Begeistert von IT, Gaming und Technologie",
    "hero.cta": "Lerne mich kennen",

    // Terminal
    "terminal.passion": "IT & Gaming",
    "terminal.ready": "Bereit für neue Möglichkeiten!",
    "terminal.scroll": "Nach unten scrollen zum Folgen",

    // About
    "about.title": "Über Mich",
    "about.description":
      "Ich bin ein 25-jähriger IT-Enthusiast aus Deutschland, der 2024 seine Ausbildung zum IT-Systemintegrator abgeschlossen hat. Ich bin begeistert von Gaming, dem Hosten von Game-Servern, der Entwicklung für Spiele und der Erkundung neuer Technologien. Ich arbeite hauptsächlich mit Minecraft- und FiveM-Servern und helfe Communities bei ihren Gaming-Bedürfnissen. Derzeit suche ich nach neuen Möglichkeiten im IT-Bereich!",
    "about.age": "Alter",
    "about.location": "Standort",
    "about.education": "Ausbildung",
    "about.education.value": "IT-Spezialist für Systemintegration",
    "about.status": "Status",
    "about.status.value": "Suche IT-Möglichkeiten",
    "about.discord": "Discord",
    "about.availability": "Verfügbar für Arbeit",
    "about.zsx.title": "ZSX Community",
    "about.zsx.role": "Hobby-Projekt",
    "about.zsx.description":
      "Beitrag zur ZSX Gaming-Community in meiner Freizeit, Hilfe bei technischem Support und Server-Management als Hobby-Projekt.",
    "about.zsx.link": "ZSX besuchen",

    // Skills
    "skills.title": "Meine Fähigkeiten",
    "skills.languages": "Programmiersprachen",
    "skills.frameworks": "Frameworks & Bibliotheken",
    "skills.tools": "Tools & Technologien",
    "skills.currently": "Aktuell am Lernen",

    // Contact
    "contact.title": "Kontakt",
    "contact.description":
      "Kontaktiere mich gerne per E-Mail, Discord oder schau dir mein GitHub-Profil an. Ich bin offen für Jobmöglichkeiten und Zusammenarbeit!",
    "contact.email": "E-Mail",
    "contact.github": "GitHub",
    "contact.discord": "Discord",

    // Footer
    "footer.copyright": "© 2024 Appercy. Alle Rechte vorbehalten.",
    "footer.meme": "Angetrieben durch Kaffee und Memes",

    // Easter Eggs
    "easter.hint": "Versuche den Konami-Code oder tippe 'rick'",

    // Services
    "services.title": "Was Ich Mache",
    "services.subtitle": "Gaming- und IT-Services, für die ich in meiner Freizeit eine Leidenschaft habe",
    "services.gamedev.title": "Spieleentwicklung",
    "services.gamedev.description":
      "Erstelle Mods, Plugins und maßgeschneiderte Lösungen für Spiele wie FiveM und Minecraft.",
    "services.gamedev.feature1": "FiveM Scripts & Ressourcen",
    "services.gamedev.feature2": "Minecraft Plugins",
    "services.gamedev.feature3": "Benutzerdefinierte Spiel-Tools",
    "services.hosting.title": "Game-Server Management",
    "services.hosting.description": "Verwaltung und Wartung von Minecraft- und FiveM-Servern für optimale Leistung.",
    "services.hosting.feature1": "Minecraft Server Setup",
    "services.hosting.feature2": "FiveM Server Konfiguration",
    "services.hosting.feature3": "Performance-Überwachung",
    "services.gaming.title": "Gaming-Projekte",
    "services.gaming.description":
      "Arbeit an verschiedenen gaming-bezogenen Projekten und Hilfe für Gaming-Communities.",
    "services.gaming.feature1": "Community-Projekte",
    "services.gaming.feature2": "Gaming-Events",
    "services.gaming.feature3": "Spieler-Support",
    "services.community.title": "Community-Aufbau",
    "services.community.description": "Aufbau und Verwaltung von Gaming-Communities und Discord-Servern.",
    "services.community.feature1": "Discord-Bot Entwicklung",
    "services.community.feature2": "Community-Events",
    "services.community.feature3": "Mitglieder-Engagement",
    "services.support.title": "Server-Support",
    "services.support.description":
      "Hilfe für andere Server-Besitzer bei technischen Problemen und Server-Optimierung.",
    "services.support.feature1": "Technische Fehlerbehebung",
    "services.support.feature2": "Server-Konfigurationshilfe",
    "services.support.feature3": "Performance-Optimierung",
    "services.performance.title": "Performance-Optimierung",
    "services.performance.description": "Optimierung von Game-Servern und Anwendungen für beste Leistung.",
    "services.performance.feature1": "Server-Tuning",
    "services.performance.feature2": "Ressourcen-Management",
    "services.performance.feature3": "Lag-Reduzierung",
    "services.cta.title": "Suche IT-Möglichkeiten",
    "services.cta.description":
      "Ich suche aktiv nach neuen Möglichkeiten im IT-Bereich und würde gerne über potenzielle Rollen oder Projekte sprechen!",
    "services.cta.button": "Kontakt aufnehmen",
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
