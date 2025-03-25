"use client"
import React from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InfoIcon from '@mui/icons-material/Info'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'
import { useTrail, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

export interface IconsListItem {
  id: string
  icon: 'ChevronRight' | 'ChevronLeft' | 'Info' | 'Alert' | 'Check'
  text: string
}

export interface IconsListBlockProps {
  title?: string
  items?: IconsListItem[]
}

export const IconsListBlock: React.FC<IconsListBlockProps> = ({ title, items }) => {
  // Используем безопасное значение для items, чтобы хуки вызывались всегда.
  const safeItems = items || []

  // Хук вызывается всегда.
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Хук анимации вызывается всегда, даже если safeItems пуст.
  const trail = useTrail(safeItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 }
  })

  // Если элементов нет, возвращаем null, но хуки уже вызваны.
  if (safeItems.length === 0) return null

  const iconMapping: Record<string, React.ReactNode> = {
    ChevronRight: <ChevronRightIcon sx={{ color: '#8d004c' }} />,
    ChevronLeft: <ChevronLeftIcon sx={{ color: '#8d004c' }} />,
    Info: <InfoIcon sx={{ color: '#8d004c' }} />,
    Alert: <ErrorOutlineIcon sx={{ color: '#8d004c' }} />,
    Check: <CheckIcon sx={{ color: '#8d004c' }} />,
  }

  return (
    <Box ref={ref} className="container">
      {title && (
        <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: '600' }}>
          {title}
        </Typography>
      )}
      <List>
        {trail.map((animation, index) => {
          const item = safeItems[index]
          return (
            <Box
              key={item?.id}
              component={animated.div as React.ElementType}
              style={animation}
            >
              <ListItem>
                <ListItemIcon>{iconMapping[item!.icon] || item?.icon}</ListItemIcon>
                <ListItemText
                  primary={item?.text}
                  slotProps={{
                    primary: { sx: { fontSize: '1rem' } },
                  }}
                />
              </ListItem>
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
