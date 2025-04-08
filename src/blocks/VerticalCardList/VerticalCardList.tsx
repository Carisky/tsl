'use client'

import React from 'react'
import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import RichText from '@/components/RichText'

interface ImageData {
  image: {
    url: string
  }
}

interface LinkGroupInternal {
  type: 'internal'
  reference: { value: { slug: string } }
  newTab: boolean
}

interface LinkGroupExternal {
  type: 'external'
  url: string
  newTab: boolean
}

type LinkGroup = LinkGroupInternal | LinkGroupExternal

interface CardData {
  Images: ImageData[]
  title: string
  description: string | any
  link: LinkGroup
}

interface VerticalCardListProps {
  cards: CardData[]
}

export const VerticalCardList: React.FC<VerticalCardListProps> = ({ cards }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  })

  const AnimatedDiv = animated('div')

  return (
    <Box className="container" ref={ref} display="flex" flexDirection="column" gap={2}>
      {cards.map((card: CardData, index: number) => {
        const linkHref =
          card.link.type === 'internal'
            ? card.link.reference?.value?.slug
              ? `/${card.link.reference.value.slug}`
              : '#'
            : card.link.url
        const targetAttr = card.link.newTab ? '_blank' : '_self'

        const cardContent = (
          <AnimatedDiv style={animationProps} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
              }}
            >
              <Divider sx={{ height: '2px', backgroundColor: '#026260' }} />
              <Typography textAlign="center" fontSize="26px" variant="h4">
                {card.title}
              </Typography>
              <Divider sx={{ height: '2px', backgroundColor: '#026260' }} />
              <Box
                sx={{
                  display: 'flex',
                  // На мобильных устройствах (xs) — колоночный порядок,
                  // на десктопе (md и выше) — строковый
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 1,
                  mt: 2,
                }}
              >
                {card.Images.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    {card.Images.map((img: ImageData, idx: number) => (
                      <Box
                        key={idx}
                        component="img"
                        src={img?.image?.url || '/path/to/fallback-image.jpg'}
                        alt={`card image ${idx + 1}`}
                        sx={{
                          marginBottom: '10px',
                          maxWidth: '400px',
                          aspectRatio: '1/1',
                          objectFit: 'cover',
                          width: { xs: '100%', md: 'auto' },
                        }}
                      />
                    ))}
                  </Box>
                )}
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {card.description && typeof card.description === 'object' ? (
                    <RichText data={card.description} enableGutter={false} />
                  ) : (
                    <Typography variant="body1">{card.description}</Typography>
                  )}
                </CardContent>
              </Box>
            </Card>
          </AnimatedDiv>
        )

        return card.link.type === 'external' ? (
          <a
            key={index}
            href={linkHref}
            target={targetAttr}
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {cardContent}
          </a>
        ) : (
          <Link
            key={index}
            href={linkHref}
            target={targetAttr}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {cardContent}
          </Link>
        )
      })}
    </Box>
  )
}

export default VerticalCardList
