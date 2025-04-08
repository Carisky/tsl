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
  titleVariant?: 'h2' | 'h3' | 'h4'
  items?: IconsListItem[]
}
const titleFontSizeMap: Record<string, string> = {
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem'
}
export const IconsListBlock: React.FC<IconsListBlockProps> = ({ title, titleVariant = 'h4', items }) => {
  const safeItems = items || []
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })
  const trail = useTrail(safeItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 }
  })

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
        <Typography variant={titleVariant} color="primary" sx={{ mb: 2, fontWeight: '500', fontSize:titleFontSizeMap[titleVariant] }}>
          {title}
        </Typography>
      )}
      <List>
        {trail.map((animation, index) => {
          const item = safeItems[index]
          return (
            <Box key={item?.id} component={animated.div as React.ElementType} style={animation}>
              <ListItem>
                <ListItemIcon>{iconMapping[item!.icon] || item?.icon}</ListItemIcon>
                <ListItemText
                  primary={item?.text}
                  slotProps={{ primary: { sx: { fontSize: '1rem' } } }}
                />
              </ListItem>
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
