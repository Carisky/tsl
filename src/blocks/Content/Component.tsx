import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { Card, CardContent } from '@mui/material'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-8">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.map((col, index) => {
          const { enableLink, link, richText, media, contentType, size, maxImageSize } = col
          // Если значение не указано, по умолчанию 600px
          const maxSize = maxImageSize ? Number(maxImageSize) : 600

          return (
            <div
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                'md:col-span-2': size !== 'full',
              })}
              key={index}
            >
              {contentType === 'text' &&
                richText &&
                (col.paperCard ? (
                  <Card elevation={3} className="h-full">
                    <CardContent>
                      <RichText
                        data={richText}
                        enableGutter={false}
                        textSize={col.textSize ?? 'text-base'}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    textSize={col.textSize ?? 'text-base'}
                  />
                ))}
              {contentType === 'image' && media && (
                <div
                  className="relative w-full aspect-square"
                  style={{ maxWidth: `${maxSize}px`, maxHeight: `${maxSize}px` }}
                >
                  {typeof media === 'string' ? (
                    <Image src={media} alt="Column image" fill className="object-cover" />
                  ) : media.url ? (
                    <Image src={media.url} alt="Column image" fill className="object-cover" />
                  ) : null}
                </div>
              )}
              {enableLink && <CMSLink {...link} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
