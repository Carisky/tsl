import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaleState {
  locale: string |undefined;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "pl",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "locale-storage" }
  )
);