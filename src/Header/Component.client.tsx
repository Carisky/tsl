'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useLocaleStore } from '@/app/(frontend)/store/useLocaleStore'
import LanguageSwitcher from '@/app/(frontend)/components/LanguageSwitcher'
import palette from '@/palette'
import { Box } from '@mui/material'

export const HeaderClient: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { setLocale, locale } = useLocaleStore()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [navData, setNavData] = useState<Header | null>(null)

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleLanguage = (option: 'pl' | 'en' | 'ua' | 'ru' | 'all') => {
    setLocale(option)
    document.cookie = `locale=${option}; path=/`
    setIsMobileMenuOpen(false)
    window.location.reload()
  }

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const response = await fetch('/api/globals/header?depth=1&draft=false&locale=' + locale)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: Header = await response.json()
        setNavData(data)
      } catch (error) {
        console.error('Failed to fetch navigation:', error)
      }
    }
    fetchNav()
  }, [locale])

  return (
    <header
      className="container p-6 relative max-w-full z-20"
      {...(theme ? { 'data-theme': theme } : {})}
      style={{ backgroundColor: palette.nav.background }}
    >
      <Box className="flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 min-w-[80px]">
          <Logo loading="eager" priority="high" className="invert dark:invert-0 w-20 h-20" />
        </Link>

        <Box className="flex items-center">
          {/* Десктопное меню */}
          <Box className="hidden xl:flex items-center space-x-4">
            <LanguageSwitcher />
            {navData && <HeaderNav data={navData} />}
          </Box>

          {/* Бургер-иконка для мобильных */}
          <Box className="xl:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="h-6 w-6" />
              ) : (
                <IoMdMenu className="h-6 w-6" />
              )}
            </button>
          </Box>
        </Box>
      </Box>

      {/* Модальное правое меню (sidebar) для мобильных */}
      {isMobileMenuOpen && (
        <Box className="fixed inset-0 z-30 flex">
          {/* Затемненная область слева для закрытия */}
          <Box className="flex-1" onClick={toggleMobileMenu}></Box>
          {/* Sidebar меню */}
          <Box className="max-w-sm h-full bg-white shadow-lg p-6 flex flex-col">
            <Box className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </Box>
            {/* Переключатель языка */}
            <Box className="flex justify-around my-4">
              <button
                onClick={() => handleLanguage('en')}
                className="px-3 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
              >
                🇬🇧
              </button>
              <button
                onClick={() => handleLanguage('ua')}
                className="px-3 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
              >
                🇺🇦
              </button>
              <button
                onClick={() => handleLanguage('ru')}
                className="px-3 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
              >
                🇷🇺
              </button>
              <button
                onClick={() => handleLanguage('pl')}
                className="px-3 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
              >
                🇵🇱
              </button>
            </Box>
            {/* Вертикальный список навигации */}
            <Box className="flex flex-col space-y-4 mt-4">
              {navData && <HeaderNav data={navData} vertical={true} />}
            </Box>
          </Box>
        </Box>
      )}
    </header>
  )
}
