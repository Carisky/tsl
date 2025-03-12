// components/LanguageSwitcher.tsx
"use client"

import React from 'react'
import { useLocaleStore } from '../store/useLocaleStore'

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocaleStore()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as "pl" | "en" | "ua" | "ru" | "all"
    setLocale(newLocale)
    // Обновляем cookie
    document.cookie = `locale=${newLocale}; path=/`
    window.location.reload()
  }

  return (
    <select value={locale} onChange={handleChange}>
      <option value="en">EN</option>
      <option value="ua">UA</option>
      <option value="ru">RU</option>
      <option value="pl">PL</option>
    </select>
  )
}

export default LanguageSwitcher
