// components/blocks/MediaBlock.tsx
import type { StaticImageData } from 'next/image'
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

// Тип из сгенерированных типов Payload (учитывая новое поле `size`)
import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

const sizeClasses: Record<string, string> = {
  small: 'max-w-[200px]',
  'small-plus': 'max-w-[300px]',
  medium: 'max-w-[350px]',
  'medium-plus': 'max-w-[500px]',
  large: 'max-w-[700px]',
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    size = 'medium',
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            'border border-border rounded-[0.8rem]',
            sizeClasses[size] || sizeClasses.medium,
            imgClassName,
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
