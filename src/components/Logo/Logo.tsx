import palette from '@/palette'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={80}
      height={80}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      style={{
        backgroundColor: palette.logo.bg, // Динамический цвет фона
        filter: 'invert(0)',              // Запрещаем инверсию логотипа
      }}
      className={clsx('p-3 w-[80px] h-[80px] rounded-2xl', props.className)}
      src="/api/media/file/firm_logo.png"
    />
  )
}
