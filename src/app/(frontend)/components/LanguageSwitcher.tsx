// components/LanguageSwitcher.tsx
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useLocaleStore } from '../store/useLocaleStore'

const options: ("en" | "ua" | "ru" | "pl" | "all")[] = ["en", "ua", "ru", "pl"]

const languageLabels: Record<"en" | "ua" | "ru" | "pl" | "all", string> = {
  en: "English",
  ua: "Українська",
  ru: "Русский",
  pl: "Polski",
  all: "ALL",
}

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocaleStore()
  // Если locale undefined, то используем значение по умолчанию 'en'
  const currentLocale = locale ?? 'en'

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleOptionClick = (option: "pl" | "en" | "ua" | "ru" | "all") => {
    setLocale(option)
    document.cookie = `locale=${option}; path=/`
    setIsOpen(false)
    window.location.reload()
  }

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button 
        onClick={toggleDropdown} 
        className="w-36 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg flex justify-between items-center"
      >
        <span>{languageLabels[currentLocale as "en" | "ua" | "ru" | "pl" | "all"] || currentLocale.toUpperCase()}</span>
        <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option, index) => (
              <div 
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out transform ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {languageLabels[option]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
