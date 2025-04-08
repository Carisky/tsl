'use client'

import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

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
  description: string
  link: LinkGroup
}

interface VerticalCardListProps {
  cards: CardData[]
}

export const VerticalCardList: React.FC<VerticalCardListProps> = ({ cards }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
              : '#' // или другое значение по умолчанию
            : card.link.url
        const targetAttr = card.link.newTab ? '_blank' : '_self'
        const cardContent = (
          <AnimatedDiv style={animationProps} key={index}>
            <Card
              sx={{
                display: 'flex',
                '@media (max-width:768px)': {
                  flexWrap: 'wrap',
                },
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 1,
                  width: 550,
                  height: 250,
                  objectFit: 'cover',
                  '@media (max-width:768px)': {
                    width: 350,
                    height: 150,
                  },
                }}
              >
                {card.Images.map((img: ImageData, idx: number) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img.image.url}
                    alt={`card image ${idx + 1}`}
                    sx={{
                      minWidth: 250,
                      minHeight: 250,
                      objectFit: 'cover',
                      '@media (max-width:768px)': {
                        minWidth: 150,
                        minHeight: 150,
                      },
                    }}
                  />
                ))}
              </Box>
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography variant="h4">{card.title}</Typography>
                <Typography variant="body1">{card.description}</Typography>
              </CardContent>
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
