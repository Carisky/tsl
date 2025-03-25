// components/blocks/MediaBlock.tsx
"use client"
import type { StaticImageData } from 'next/image'
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { useSpring, animated } from 'react-spring'
import { Box } from '@mui/material'
import { useInView } from 'react-intersection-observer'
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

// Создаём анимированный компонент на базе MUI Box
const AnimatedBox = animated(Box)

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

  // Отслеживание попадания в viewport на 30%
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const fadeAnimation = useSpring({
    opacity: inView ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 },
  })

  return (
    <AnimatedBox
      ref={ref}
      style={fadeAnimation}
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
        <Box
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </Box>
      )}
    </AnimatedBox>
  )
}
