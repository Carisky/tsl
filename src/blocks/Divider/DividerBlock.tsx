"use client"
import React from 'react'
import { useTheme } from '@/providers/Theme'
export interface DividerBlockProps {
  height?: number
  backgroundColor?: string
}

export const DividerBlock: React.FC<DividerBlockProps> = ({
  height = 2,
}) => {
  const { theme } = useTheme()
  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundColor: theme==="light"? "#000000" : "#FFFFFF",
      }}
    />
  )
}
