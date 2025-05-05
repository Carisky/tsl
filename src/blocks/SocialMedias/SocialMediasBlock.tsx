import React from 'react'
import { Box } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from 'next/link'

export default function SocialMediasBlock() {
  const icons = [
    {
      id: 'tg',
      icon: <TelegramIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#0088cc',
      link: 'http://t.me/WiktoriaKwiatkowska',
    },
    {
      id: 'inst',
      icon: <InstagramIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#E1306C',
      link: 'https://www.instagram.com/tsl_silesia/',
    },
    {
      id: 'youtube',
      icon: <YouTubeIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#FF0000',
      link: 'https://www.youtube.com/@tslsilesia9930',
    },
    {
      id: 'fb',
      icon: <FacebookIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#1877F2',
      link: 'https://www.facebook.com/TSLSilesia',
    },
    {
      id: 'whatsapp',
      icon: <WhatsAppIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#25D366',
      link: 'https://wa.me/+48608675834',
    },
    {
      id: 'linkedin',
      icon: <LinkedInIcon sx={{ color: 'white', fontSize: 20 }} />,
      bgColor: '#0A66C2',
      link: 'https://www.linkedin.com/company/104711986/admin/dashboard/',
    },
  ]

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        top:"25%",
        zIndex: 20,
        cursor: 'pointer',

      }}
      gap={2}
    >
      {icons.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Box
            width={30}
            height={30}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
            margin={2}
            sx={{ backgroundColor: item.bgColor, borderRadius: '8px' }}
          >
            {item.icon}
          </Box>
        </Link>
      ))}
    </Box>
  )
}
