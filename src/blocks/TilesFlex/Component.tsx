import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material'

export interface Tile {
  id: string
  image: { url: string }
  text: string
  link?: { slug: string; title: string; id: string }
}

export interface TilesFlexProps {
  tiles?: Tile[]
}

export const TilesFlexComponent: React.FC<TilesFlexProps> = ({ tiles }) => {
  if (!tiles || tiles.length === 0) return null

  return (
    <Box sx={{ display: 'flex', maxWidth:"86vw", margin:"auto", flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
      {tiles.map((tile) => (
        <Box
          key={tile.id}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' }
          }}
        >
          {tile.link ? (
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
                image={tile.image.url}
                alt={tile.text}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {tile.text}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      ))}
    </Box>
  )
}
