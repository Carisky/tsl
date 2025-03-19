import React from 'react'

export interface DividerBlockProps {
  height?: number
  backgroundColor?: string
}

export const DividerBlock: React.FC<DividerBlockProps> = ({
  height = 2,
  backgroundColor = '#000000',
}) => {
  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundColor,
      }}
    />
  )
}
