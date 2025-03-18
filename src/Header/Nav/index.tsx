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
    ? "flex flex-col gap-4" 
    : "flex gap-3 items-center h-20" 

  return (
    <nav className={navClassName}>
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link" />
      ))}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
