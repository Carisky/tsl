'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Box } from '@mui/material'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  showRichText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isRoot = pathname === '/'

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  const minHeightClass = isRoot ? 'min-h-[125vh]' : 'min-h-[125vh]'
  const imgClassName = isRoot ? '-z-10 object-contain' : '-z-10 object-cover'

  return (
    <div className="relative -mt-[5rem] flex items-center justify-center" data-theme="dark">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        {showRichText && richText && (
          <Box>
            <RichText
              className="text-white text-2xl text-[#FDFFFC] md:text-3xl font-semibold"
              data={richText}
              enableGutter={false}
            />
          </Box>
        )}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`${minHeightClass} select-none`}>
        {media && typeof media === 'object' && (
          <Media fill imgClassName={imgClassName} priority resource={media} />
        )}
      </div>
    </div>
  )
}
