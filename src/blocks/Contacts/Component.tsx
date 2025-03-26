'use client'

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material'
import { useLocaleStore } from '@/app/(frontend)/store/useLocaleStore'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

export interface Contact {
  id: string
  group: string | { name: string }
  media?: { url: string }
  name: string
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
  // Список контактов, выбранных администратором
  contacts: Contact[]
  // Фильтр групп (если пустой — показывать все)
  filterGroups?: FilterGroup[]
}

const ContactsList: React.FC<ContactsBlockProps> = ({
  contacts: initialContacts,
  filterGroups,
}) => {
  const { locale: userLocale } = useLocaleStore()
  // Если не приходит контактов из блока, можно использовать API-фетч (опционально)
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [loading, setLoading] = useState<boolean>(!initialContacts.length)
  const [error, setError] = useState<string | null>(null)

  // Тексты для локалей для загрузки и ошибок
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
      pl: 'Przepraszamy, wystąpił błąd podczas ładowania kontaktów',
    },
  }

  // Переводы для полей
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
    email: {
      ru: 'Электронная почта',
      ua: 'Електронна пошта',
      en: 'Email',
      pl: 'E-mail',
    },
  }

  type SupportedLocale = 'ru' | 'ua' | 'en' | 'pl'
  const localeKey: SupportedLocale =
    userLocale && ['ru', 'ua', 'en', 'pl'].includes(userLocale)
      ? (userLocale as SupportedLocale)
      : 'en'

  const loadingText = translations.loading[localeKey]
  const errorText = translations.error[localeKey]

  useEffect(() => {
    if (initialContacts.length) return
    const fetchContacts = async () => {
      try {
        const res = await fetch(`/api/contacts/?locale=${userLocale}`)
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
        const data = await res.json()
        setContacts(data.docs)
      } catch (err: unknown) {
        console.error(err)
        setError('error')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 750)
      }
    }
    fetchContacts()
  }, [userLocale, initialContacts])

  // Группировка контактов по group.name или group (если строка)
  const groupedContacts = contacts.reduce((acc: Record<string, Contact[]>, contact) => {
    const groupName =
      typeof contact.group === 'object' && contact.group !== null
        ? contact.group.name
        : contact.group
    if (!acc[groupName]) {
      acc[groupName] = []
    }
    acc[groupName].push(contact)
    return acc
  }, {})

  // Если админ задал фильтр, оставляем только указанные группы
  const adminFilter: string[] =
    filterGroups && filterGroups.length > 0 ? filterGroups.map((item) => item.group) : []
  const displayGroups =
    adminFilter.length > 0
      ? Object.keys(groupedContacts).filter((group) => adminFilter.includes(group))
      : Object.keys(groupedContacts)

  // Всегда вызываем хуки для анимации
  const [viewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  })
  const AnimatedDiv = animated('div')

  if (loading) {
    return (
      <Snackbar open={true}>
        <Alert severity="info" variant="filled">
          {loadingText}
        </Alert>
      </Snackbar>
    )
  }

  if (error) {
    return (
      <Snackbar open={true}>
        <Alert
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
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
        <AnimatedDiv key={groupKey} style={animationProps} ref={viewRef}>
          <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
            {groupKey}
          </Typography>
          {groupedContacts[groupKey]?.map((contact) => (
            <Box
              key={contact.id}
              sx={{
                border: '1px solid #ccc',
                marginBottom: '1rem',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                width:"fit-content"
              }}
            >
              {contact.media && (
                <img
                  src={contact.media.url}
                  alt={contact.name}
                  style={{ maxWidth: '150px', aspectRatio: '1/1', objectFit: 'cover' }}
                />
              )}
              <Typography variant="h6">{contact.name}</Typography>
              <Typography>
                <strong>{translationsLabels.position[localeKey]}:</strong> {contact.position}
              </Typography>
              <Typography>
                <strong>{translationsLabels.phone[localeKey]}:</strong> {contact.tel.primary}
              </Typography>
              {contact.tel.wew && (
                <Typography>
                  <strong>{translationsLabels.additionalPhone[localeKey]}:</strong>{' '}
                  {contact.tel.wew}
                </Typography>
              )}
              <Typography>
                <strong>{translationsLabels.email[localeKey]}:</strong> {contact.email}
              </Typography>
            </Box>
          ))}
        </AnimatedDiv>
      ))}
    </Box>
  )
}

export default ContactsList
