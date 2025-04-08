'use client'

import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Box, Divider, Typography, Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Image = {
  image: { url: string }
}

type SizeOption = 'small' | 'small+' | 'medium' | 'medium+' | 'large' | 'xl' | 'auto'

type ImageSliderProps = {
  title: string
  images: Image[]
  mode?: 'slider' | 'slider-static' | 'grid'
  maxSize?: SizeOption
  gridColumns?: 2 | 3 | 4
  gridAspectRatio?: '4/3' | '1/1' | '16/9'
}

export default function ImageSlider({
  title,
  images,
  mode = 'slider',
  maxSize = 'auto',
  gridColumns = 3,
  gridAspectRatio = '1/1',
}: ImageSliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1240 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1240, min: 868 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 868, min: 0 }, items: 1, slidesToSlide: 1 },
  }

  const sizeMapping: Record<SizeOption, number> = {
    small: 200,
    'small+': 250,
    medium: 300,
    'medium+': 350,
    large: 400,
    xl: 500,
    auto: 600,
  }

  const maxSizeValue = sizeMapping[maxSize]

  const renderImages = () => {
    if (mode === 'slider') {
      return (
        <Carousel responsive={responsive} infinite containerClass="" itemClass="">
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#000',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: maxSizeValue,
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  borderRadius: 2,
                  borderColor: '#000',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedImage(img.image.url)}
              >
                <Box
                  component="img"
                  src={img.image.url}
                  alt={`Slide ${index + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          ))}
        </Carousel>
      )
    } else if (mode === 'grid') {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)', // на телефонах: 1 колонка
              sm: `repeat(${gridColumns}, 1fr)`, // на остальных экранах: заданное число колонок
            },
            gap: 2,
            mt: 2,
            margin: 'auto',
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: maxSizeValue,
                maxHeight: maxSizeValue,
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                borderColor: '#000',
                borderWidth: '2px',
                borderStyle: 'solid',
                // если gridColumns равно 2, выравниваем картинку по левой или правой стороне
                ...(gridColumns === 2 && {
                  justifySelf: index % 2 === 0 ? 'start' : 'end',
                  margin: 0,
                }),
                // для остальных режимов оставляем центрирование
                ...(gridColumns !== 2 && { margin: 'auto' }),
              }}
              onClick={() => setSelectedImage(img.image.url)}
            >
              <Box
                component="img"
                src={img.image.url}
                alt={`Grid ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: gridAspectRatio,
                  objectFit: 'fill',
                }}
              />
            </Box>
          ))}
        </Box>
      )
    } else {
      // slider-static – прежняя логика
      return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            mt: 2,
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: maxSizeValue,
                maxHeight: maxSizeValue,
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                borderColor: '#000',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
              onClick={() => setSelectedImage(img.image.url)}
            >
              <Box
                component="img"
                src={img.image.url}
                alt={`Tile ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      )
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      {title && (
        <>
          <Divider sx={{ height: '2px', backgroundColor: '#029270' }} />
          <Typography
            variant="h5"
            sx={{ mt: 2, mb: 2, textAlign: 'center', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#029270' }} />
        </>
      )}

      {renderImages()}

      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          onClick={() => setSelectedImage(null)}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <Box onClick={(e) => e.stopPropagation()} sx={{ position: 'relative', outline: 'none' }}>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                backgroundColor: '#000000',
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                color: '#fff',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedImage || ''}
              alt="Selected"
              sx={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
