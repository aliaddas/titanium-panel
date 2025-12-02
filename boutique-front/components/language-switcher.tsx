"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "NL", label: "Nederlands" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
  { code: "PT", label: "Português" },
]

export function LanguageSwitcher() {
  const [language, setLanguage] = useState("EN")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10 px-2"
        >
          {language}
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#f8f5f0] dark:bg-[#1c2620] border-[#a8d5ba]/20">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between cursor-pointer text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10 ${
              language === lang.code ? "bg-[#a8d5ba]/10" : ""
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span>{lang.label}</span>
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
