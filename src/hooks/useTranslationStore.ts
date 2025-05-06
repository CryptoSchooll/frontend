import { create } from "zustand"

import { translations } from "@/lib/translation"

type TranslationStore = {
  language: LanguageCode
  switchLanguage: () => void
  translations: Record<string, string>
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: "en",
  switchLanguage: () => {
    const newLanguage = get().language === "en" ? "ru" : "en"
    return set(() => ({
      language: newLanguage,
      translations: translations[newLanguage],
    }))
  },
  translations: translations["en"],
}))
