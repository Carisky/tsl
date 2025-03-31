"use client"
import type { StaticImageData } from 'next/image'
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { useSpring, animated } from 'react-spring'
import { Box, useTheme, useMediaQuery } from '@mui/material'
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
  // Новые поля
  caption?: any
  imageAlignment?: 'left' | 'center' | 'right'
  captionPosition?: 'left' | 'right' | 'bottom' | 'top'
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
    caption, // новое поле
    imageAlignment = 'center',
    captionPosition = 'bottom',
  } = props

  // Используем переданный caption или значение из media (если объект)
  const captionContent =
    caption ?? (media && typeof media === 'object' ? media.caption : null)

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

  // Получаем тему и определяем, мобильное ли устройство
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Если мобильное устройство, всегда используем вертикальный layout
  const effectiveCaptionPosition = isMobile ? 'bottom' : captionPosition

  // Классы выравнивания картинки
  const imageAlignClass =
    imageAlignment === 'center'
      ? 'mx-auto'
      : imageAlignment === 'right'
      ? 'ml-auto'
      : 'mr-auto'

  // Функция для рендеринга компонента Media
  const renderImage = () => (
    <>
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
    </>
  )

  return (
    <AnimatedBox
      ref={ref}
      style={fadeAnimation}
      className={cn({ container: enableGutter }, className)}
    >
      {(effectiveCaptionPosition === 'top' || effectiveCaptionPosition === 'bottom') ? (
        <>
          {effectiveCaptionPosition === 'top' && captionContent && (
            <Box className={cn({ container: !disableInnerContainer }, captionClassName)}>
              <RichText data={captionContent} enableGutter={false} />
            </Box>
          )}
          <Box className={imageAlignClass}>{renderImage()}</Box>
          {effectiveCaptionPosition === 'bottom' && captionContent && (
            <Box className={cn({ container: !disableInnerContainer }, captionClassName)}>
              <RichText data={captionContent} enableGutter={false} />
            </Box>
          )}
        </>
      ) : (
        // effectiveCaptionPosition === 'left' или 'right'
        <Box className="flex flex-row">
          {effectiveCaptionPosition === 'left' && captionContent && (
            <Box className={cn('mr-4', { container: !disableInnerContainer }, captionClassName)}>
              <RichText data={captionContent} enableGutter={false} />
            </Box>
          )}
          <Box className={imageAlignClass}>{renderImage()}</Box>
          {effectiveCaptionPosition === 'right' && captionContent && (
            <Box className={cn('ml-4', { container: !disableInnerContainer }, captionClassName)}>
              <RichText data={captionContent} enableGutter={false} />
            </Box>
          )}
        </Box>
      )}
    </AnimatedBox>
  )
}
