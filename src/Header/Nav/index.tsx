'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

interface HeaderNavProps {
  data: HeaderType
  vertical?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, vertical }) => {
  const navItems = data?.navItems || []
  
  // Если vertical=true, располагаем элементы вертикально, иначе горизонтально.
  const navClassName = vertical 
    ? "flex flex-col gap-4 w-40 text-black" 
    : "flex gap-3 items-center h-20 text-white" 
  const linkColor = vertical ? "text-black" : "text-white"
  return (
    <nav className={navClassName}>
      {navItems.map(({ link }, i) => (
        <CMSLink className={linkColor} key={i} {...link} appearance="link" />
      ))}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={`w-5 ${linkColor}`} />
      </Link>
    </nav>
  )
}
