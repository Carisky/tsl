'use client'
import React, { Fragment } from 'react'
import MuiCard from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from 'next/link'

import useClickableCard from '@/utilities/useClickableCard'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

interface CardProps {
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}

export const Card: React.FC<CardProps> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <MuiCard
      component="div"
      variant="outlined"
      ref={card.ref as React.Ref<HTMLDivElement>}
      className={className}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        cursor: 'pointer',
      }}
    >
      <CardActionArea component={Link} href={href} ref={link.ref}>
        <Box sx={{ width: '100%' }}>
          {!metaImage && (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body2">No image</Typography>
            </Box>
          )}
          {metaImage && (
            <Box>
              <img
                style={{ aspectRatio: 1, objectFit: 'cover' }}
                src={typeof metaImage === 'string' ? metaImage : (metaImage.url ?? undefined)}
                alt={titleToUse}
              />
            </Box>
          )}
        </Box>
        <CardContent sx={{ p: 2 }}>
          {showCategories && hasCategories && (
            <Typography
              variant="caption"
              sx={{ textTransform: 'uppercase', mb: 1, display: 'block' }}
            >
              {categories.map((category, index) => {
                if (typeof category === 'object') {
                  const categoryTitle = category.title || 'Untitled category'
                  const separator = index < categories.length - 1 ? ', ' : ''
                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {separator}
                    </Fragment>
                  )
                }
                return null
              })}
            </Typography>
          )}
          {titleToUse && (
            <Typography variant="h6" component="h3">
              {titleToUse}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {sanitizedDescription}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </MuiCard>
  )
}
