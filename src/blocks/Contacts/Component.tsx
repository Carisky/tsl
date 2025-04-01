'use client'

import React, { useState, useEffect } from 'react'
import { Box, Typography, Snackbar, Alert } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import { useSpring, animated } from 'react-spring'
import Cookies from 'js-cookie'
import { Card, CardContent, CardMedia } from '@mui/material'

export interface Contact {
  id: string
  group: string | { name: string }
  media?: { url: string }
  name: string
  laguages?: string
  tel: {
    primary: string
    wew?: string
  }
  email: string
  position: string
}

export interface FilterGroup {
  group: string
}

export interface ContactsBlockProps {
  contacts: Contact[]
  filterGroups?: FilterGroup[]
}

const ContactsList: React.FC<ContactsBlockProps> = ({
  contacts: initialContacts,
  filterGroups,
}) => {
  const [mounted, setMounted] = useState(false)
  const locale = Cookies.get('locale')
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [loading, setLoading] = useState<boolean>(!initialContacts.length)
  const [error, setError] = useState<string | null>(null)
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  })
  const AnimatedDiv = animated('div')

  useEffect(() => {
    setMounted(true)
  }, [])

  const translations = {
    loading: {
      ru: 'Загрузка...',
      ua: 'Завантаження...',
      en: 'Loading...',
      pl: 'Ładowanie...',
    },
    error: {
      ru: 'Извините, произошла ошибка загрузки контактов',
      ua: 'Вибачте, сталася помилка завантаження контактів',
      en: 'Sorry, there was an error loading contacts',
      pl: 'Przepraszamy, wystąpił błąd podczas ładowания контактов',
    },
  }
  const translationsLabels = {
    position: {
      ru: 'Должность',
      ua: 'Посада',
      en: 'Position',
      pl: 'Stanowisko',
    },
    phone: {
      ru: 'Телефон',
      ua: 'Телефон',
      en: 'Phone',
      pl: 'Telefon',
    },
    additionalPhone: {
      ru: 'Дополнительный телефон',
      ua: 'Додатковий телефон',
      en: 'Additional Phone',
      pl: 'Telefon wew',
    },
    languages: {
      ru: 'Языки',
      ua: 'Мови',
      en: 'Languages',
      pl: 'Języki',
    },
  }

  type SupportedLocale = 'ru' | 'ua' | 'en' | 'pl'
  const localeKey: SupportedLocale =
    locale && ['ru', 'ua', 'en', 'pl'].includes(locale) ? (locale as SupportedLocale) : 'en'
  const loadingText = translations.loading[localeKey]
  const errorText = translations.error[localeKey]

  const groupedContacts = contacts.reduce((acc: Record<string, Contact[]>, contact) => {
    const groups = Array.isArray(contact.group) ? contact.group : [contact.group]
    groups.forEach((grp) => {
      const groupName = typeof grp === 'object' ? grp.name : grp
      if (!acc[groupName]) {
        acc[groupName] = []
      }
      acc[groupName].push(contact)
    })
    return acc
  }, {})

  const adminFilter: string[] =
    filterGroups && filterGroups.length > 0 ? filterGroups.map((item) => item.group) : []
  const displayGroups =
    adminFilter.length > 0
      ? Object.keys(groupedContacts).filter((group) => adminFilter.includes(group))
      : Object.keys(groupedContacts)

  if (!mounted) return null

  if (loading) {
    return (
      <Snackbar open>
        <Alert severity="info" variant="filled">
          {loadingText}
        </Alert>
      </Snackbar>
    )
  }

  if (error) {
    return (
      <Snackbar open>
        <Alert
          sx={{ display: 'flex', alignItems: 'center' }}
          severity="error"
          variant="filled"
          icon={
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: 'common.white' }}>
                X
              </Typography>
            </Box>
          }
        >
          {errorText}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <Box sx={{ maxWidth: '86vw', margin: 'auto' }}>
      {displayGroups.map((groupKey) => (
        <AnimatedDiv key={groupKey} style={animationProps}>
          <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
            {groupKey}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {groupedContacts[groupKey]?.map((contact) => (
              <Card
                key={contact.id}
                sx={{
                  flexGrow: 1,
                  minWidth: '30%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {contact.media && (
                  <CardMedia
                    component="img"
                    image={contact.media.url}
                    alt={contact.name}
                    sx={{
                      borderRadius: 5,
                      maxWidth: 200,
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      mt: 2,
                      ml: 2,
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{contact.name}</Typography>
                  <Typography sx={{ maxWidth: '40ch', wordWrap: 'break-word' }}>
                    <HomeWorkIcon /> {contact.position}
                  </Typography>
                  {contact.laguages && (
                    <Typography sx={{ maxWidth: '40ch', wordWrap: 'break-word' }}>
                      <strong>{translationsLabels.languages[localeKey]}:</strong> {contact.laguages}
                    </Typography>
                  )}
                  <Typography sx={{ maxWidth: '40ch', wordWrap: 'break-word' }}>
                    <LocalPhoneIcon /> {contact.tel.primary}
                  </Typography>
                  {contact.tel.wew && (
                    <Typography sx={{ maxWidth: '40ch', wordWrap: 'break-word' }}>
                      <LocalPhoneIcon />
                      <strong>{translationsLabels.additionalPhone[localeKey]}:</strong>{' '}
                      {contact.tel.wew}
                    </Typography>
                  )}
                  <Typography sx={{ maxWidth: '40ch', wordWrap: 'break-word' }}>
                    <EmailIcon /> {contact.email}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </AnimatedDiv>
      ))}
    </Box>
  )
}

export default ContactsList
