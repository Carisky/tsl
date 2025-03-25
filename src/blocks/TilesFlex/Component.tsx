"use client"
import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material'
import { useTrail, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

export interface Tile {
  id: string
  image: { url: string }
  text: string
  link: { slug: string; title: string; id: string }
}

export interface TilesFlexProps {
  tiles?: Tile[]
}

export const TilesFlexComponent: React.FC<TilesFlexProps> = ({ tiles }) => {
  const safeTiles = tiles || [] 

  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const trail = useTrail(safeTiles.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 }
  })

  
  if (safeTiles.length === 0) return null

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        maxWidth: '86vw',
        margin: 'auto',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between'
      }}
    >
      {trail.map((animation, index) => {
        const tile = safeTiles[index]
        return (
          <Box
            key={tile?.id}
            component={animated.div as React.ElementType}
            style={animation as any}
            sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(33.333% - 16px)'
              }
            }}
          >
            {tile?.link ? (
              <Card>
                <CardActionArea component="a" href={tile.link.slug}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={tile.image.url}
                    alt={tile.text}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {tile.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ) : (
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={tile?.image.url}
                  alt={tile?.text}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {tile?.text}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
