"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/providers/Theme'

export interface DividerBlockProps {
  height?: number
  backgroundColor?: string
}

export const DividerBlock: React.FC<DividerBlockProps> = ({
  height = 2,
}) => {
  const { theme } = useTheme() || { theme: 'light' } // Значение по умолчанию
  const [bgColor, setBgColor] = useState('#000000') // Начальное значение для SSR

  useEffect(() => {
    // Обновляем цвет только на клиенте после гидратации
    setBgColor(theme === "light" ? "#000000" : "#FFFFFF")
  }, [theme])

  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundColor: bgColor,
      }}
    />
  )
}