'use client'

import React from 'react'
import type { Header as HeaderType, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from 'next/navigation'

interface HeaderNavProps {
  data: HeaderType
  vertical?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, vertical }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const navClassName = vertical 
    ? "flex flex-col gap-4 w-40 text-black" 
    : "flex gap-3 items-center h-20 text-white" 
  const linkColor = vertical ? "text-black" : "text-white"

  return (
    <nav className={navClassName}>
      {navItems.map(({ link }, i) => {
        const slug = (link.reference?.value as Page | Post)?.slug
        const href = slug === 'home' ? '/' : `/${slug}`
        const isActive = pathname === href

        if (slug === 'home') {
          return (
            <Link href="/" key={i}>
              <HomeIcon className={isActive ? "text-[#8D004C] underline" : "text-white"} />
            </Link>
          )
        }

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={`${linkColor} ${isActive ? "underline text-[#8D004C]" : ""}`}
          />
        )
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={`w-5 ${pathname === "/search" ? "text-pink-500 underline" : linkColor}`} />
      </Link>
    </nav>
  )
}

