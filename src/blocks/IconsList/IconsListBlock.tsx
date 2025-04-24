'use client'
import React from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InfoIcon from '@mui/icons-material/Info'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'
import { useTrail, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { Button } from '@mui/material'

export interface IconsListItem {
  id: string
  icon: 'ChevronRight' | 'ChevronLeft' | 'Info' | 'Alert' | 'Check'
  text: string
  enableLink?: boolean
  linkType?: 'internal' | 'external'
  reference?: { value?: { slug: string } }
  url?: string
  newTab?: boolean
}

export interface IconsListBlockProps {
  title?: string
  titleVariant?: 'h2' | 'h3' | 'h4'
  layoutMode?: 'vertical' | 'horizontal'
  iconColor?: string
  textColor?: string
  textSize?: number
  items?: IconsListItem[]
  renderAsButtons?: boolean
  buttonBgColor?: string
}

const titleFontSizeMap: Record<string, string> = {
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
}

export const IconsListBlock: React.FC<IconsListBlockProps> = ({
  title,
  titleVariant = 'h4',
  layoutMode = 'vertical',
  iconColor = '#8d004c',
  textColor = '#000000',
  textSize = 1,
  renderAsButtons,
  buttonBgColor,
  items,
}) => {
  const safeItems = items || []
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const trail = useTrail(safeItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 },
  })

  if (!safeItems.length) return null

  const iconMapping: Record<string, React.ReactNode> = {
    ChevronRight: <ChevronRightIcon sx={{ color: iconColor }} />,
    ChevronLeft: <ChevronLeftIcon sx={{ color: iconColor }} />,
    Info: <InfoIcon sx={{ color: iconColor }} />,
    Alert: <ErrorOutlineIcon sx={{ color: iconColor }} />,
    Check: <CheckIcon sx={{ color: iconColor }} />,
  }

  const listSx =
    layoutMode === 'horizontal'
      ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', p: 0 }
      : { p: 0 }

  const itemSx =
    layoutMode === 'horizontal' ? { flex: '0 1 calc(33% - 1rem)', m: '0.5rem 0', p: 0 } : { p: 0 }

  return (
    <Box ref={ref} className="container">
      {title && (
        <Typography
          variant={titleVariant}
          color="primary"
          sx={{ mb: 2, fontWeight: 600, fontSize: titleFontSizeMap[titleVariant] }}
        >
          {title}
        </Typography>
      )}
      <List sx={listSx}>
        {trail.map((animation, index) => {
          const item = safeItems[index]
          const content = item?.enableLink ? (
            item?.linkType === 'external' ? (
              <Button
                component="a"
                href={item.url}
                target={item.newTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  backgroundColor: renderAsButtons ? buttonBgColor : 'transparent',
                  color: textColor,
                  fontSize: `${textSize}rem`,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: renderAsButtons ? buttonBgColor : 'transparent',
                    opacity: 0.9,
                  },
                }}
              >
                {item.text}
              </Button>
            ) : item.reference?.value?.slug ? (
              <Button
                component="a"
                href={`/${item.reference.value.slug}`}
                target={item.newTab ? '_blank' : '_self'}
                variant="contained"
                sx={{
                  backgroundColor: renderAsButtons ? buttonBgColor : 'transparent',
                  color: textColor,
                  fontSize: `${textSize}rem`,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: renderAsButtons ? buttonBgColor : 'transparent',
                    opacity: 0.9,
                  },
                }}
              >
                {item.text}
              </Button>
            ) : (
              <Typography sx={{ color: textColor, fontSize: `${textSize}rem` }}>
                {item.text}
              </Typography>
            )
          ) : renderAsButtons ? (
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: buttonBgColor,
                color: textColor,
                fontSize: `${textSize}rem`,
                textTransform: 'none',
                boxShadow: 'none',
                width: '100%',
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '&:hover': {
                  backgroundColor: buttonBgColor,
                  opacity: 0.9,
                },
              }}
            >
              {item?.text}
            </Button>
          ) : (
            <Typography sx={{ color: textColor, fontSize: `${textSize}rem` }}>
              {item?.text}
            </Typography>
          )

          return (
            <Box sx={{
              padding:0
            }} key={item?.id} component={animated.div as React.ElementType} style={animation}>
              <ListItem sx={{ ...itemSx, display: 'flex' }}>
                {!renderAsButtons && (
                  <ListItemIcon>{iconMapping[item!.icon] || item?.icon}</ListItemIcon>
                )}
                <Box sx={{ width: '100%' }}>{content}</Box>
              </ListItem>
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
