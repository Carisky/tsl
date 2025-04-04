'use client'

import { Box, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { usePathname } from 'next/navigation'

const contactGroups = [
  [
    { type: 'label', name: 'Sprawdź Ofertę' },
    { type: 'contact', label: 'Kontakt :', value: 'Dział Marketingu' },
    { type: 'contact', label: 'Mail:', value: 'kontenery@tsl-silesia.com.pl' },
    { type: 'contact', label: 'Telefon:', value: '+48 32 282 90 62 - wew. 34' },
  ],
  [
    { type: 'label', name: 'Logistyka kontenerowa' },
    { type: 'contact', label: 'Kontakt:', value: 'Paulina' },
    { type: 'contact', label: 'Mail:', value: 'kontenery@tsl-silesia.com.pl' },
    { type: 'contact', label: 'Telefon:', value: '+48 32 282 90 62 wew. 35' },
  ],
  [
    { type: 'label', name: 'Agencja Celna' },
    { type: 'contact', label: 'Kontakt:', value: 'Dział Marketingu' },
    { type: 'contact', label: 'Mail:', value: 'kontenery@tsl-silesia.com.pl' },
    { type: 'contact', label: 'Telefon:', value: '+48 32 282 90 62 - wew. 34' },
  ],
  [
    { type: 'label', name: 'Inspekcja kontenerów – Asysta przy kontroli celnej' },
    { type: 'contact', label: 'Kontakt:', value: 'Dział Marketingu' },
    { type: 'contact', label: 'Mail:', value: 'kontenery@tsl-silesia.com.pl' },
    { type: 'contact', label: 'Telefon:', value: '+48 32 282 90 62 - wew. 34' },
  ],
]

export const MarketingContacts = () => {
  const pathname = usePathname()
  if (pathname === '/contacts' || pathname === '/privacy-policy') return null

  return (
    <Box
      sx={{
        minHeight: '200px',
        backgroundColor: '#fff',
        width: '100%',
        color: '#000',
        display: { xs: 'grid', md: 'flex' },
        gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
        gap: { xs: 4, md: 0 },
        justifyContent: { md: 'space-around' },
        alignItems: { md: 'center' },
      }}
    >
      {contactGroups.map((group, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {group.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChevronRightIcon sx={{ color: '#8d004c' }} fontSize="small" />
              {item.type === 'label' ? (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
              ) : (
                <Typography variant="body2">
                  <strong>{item.label}</strong> {item.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
