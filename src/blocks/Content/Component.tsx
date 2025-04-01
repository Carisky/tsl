import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.map((col, index) => {
          const { enableLink, link, richText, media, contentType, size } = col

          return (
            <div
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                'md:col-span-2': size !== 'full',
              })}
              key={index}
            >
              {contentType === 'text' && richText && (
                <RichText data={richText} enableGutter={false} />
              )}
              {contentType === 'image' && media && (
                typeof media === 'string' ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={media}
                      alt="Column image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : media.url ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={media.url}
                      alt="Column image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null
              )}
              {enableLink && <CMSLink {...link} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
