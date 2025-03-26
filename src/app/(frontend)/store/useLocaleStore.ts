import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie"; // установите через npm install js-cookie

interface LocaleState {
  locale: string | undefined;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: Cookies.get("locale") || "pl",
      setLocale: (locale: string) => {
        Cookies.set("locale", locale, { expires: 365 }); // сохраняем cookie на год
        set({ locale });
      },
    }),
    { name: "locale-storage" }
  )
);
