import { create } from "zustand"

type LanguageCode = "en" | "ru"

type TranslationStore = {
  language: LanguageCode
  switchLanguage: () => void
  translations: Record<string, string>
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "a": "test"
  },
  ru: {
    "a": "тест"
  },
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: "en",
  switchLanguage: () => {
    const newLanguage = get().language === "en" ? "ru" : "en"
    return set(() => ({ language: newLanguage, translations: translations[newLanguage] }))
  },
  translations: translations["en"],
}))