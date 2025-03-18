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

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { setLocale } = useLocaleStore()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <header
      className="container p-6 relative max-w-full z-20"
      {...(theme ? { 'data-theme': theme } : {})}
      style={{ backgroundColor: palette.nav.background}}
    >
      <div className={`flex items-center justify-between`}>
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex items-center">
          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <HeaderNav data={data} />
          </div>
          {/* Бургер-иконка для мобильных */}
          <div className="md:hidden">
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
          </div>
        </div>
      </div>
      {/* Модальное правое меню (sidebar) для мобильных */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Нажмите на затемненную область слева для закрытия */}
          <div className="flex-1" onClick={toggleMobileMenu}></div>
          {/* Sidebar меню */}
          <div className="w-[55%] h-full bg-white shadow-lg p-6 flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>
            {/* Переключатель языка в виде 4 кнопок с флагами */}
            <div className="flex justify-around my-4">
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
            </div>
            {/* Вертикальный список навигационных ссылок */}
            <div className="flex flex-col space-y-4 mt-4">
              <HeaderNav data={data} vertical={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
