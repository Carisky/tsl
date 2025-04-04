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
  mobile?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobile }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const navClassName = mobile 
    ? "flex flex-col gap-4  text-black" 
    : "flex w-full gap-3 justify-between items-center h-20 text-white" 
  const linkColor = mobile ? "text-black" : "text-white"
  const navElementStyle = mobile ? "flex justify-center w-full" : ""
  return (
    <nav className={navClassName}>
      {navItems.map(({ link }, i) => {
        const slug = (link.reference?.value as Page | Post)?.slug
        const href = slug === 'home' ? '/' : `/${slug}`
        const isActive = pathname === href

        if (slug === 'home') {
          return (
            <Link className={navElementStyle} href="/" key={i}>
              <HomeIcon className={(mobile?"text-black":"")+(isActive ?  `${navElementStyle} text-[#ed42a6] underline` : "text-white")} />
            </Link>
          )
        }

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={`${linkColor} ${navElementStyle} ${isActive ? "underline decoration-pink-500 decoration-2" : ""}`}
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

