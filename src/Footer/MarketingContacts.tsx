'use client'

import { Box, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { usePathname } from 'next/navigation'

const marketingContactsLeft = [
  {
    type: 'person',
    name: 'Wiktoria KWIATKOWSKA',
    position: 'Kierownik Działu Marketingu',
  },
  {
    type: 'contact',
    label: 'Kom:',
    value: '+48 608 675 834',
  },
  {
    type: 'contact',
    label: 'Email:',
    value: 'w.kwiatkowska@tsl-silesia.com.pl',
  },
  {
    type: 'contact',
    label: 'tl.wew:',
    value: '+48 32 282 90 62 - wew. 22',
  },
]
const marketingContactsMid = [
  {
    type: 'person',
    name: 'Mirosława DANCH',
    position: 'Zastępca Kierownika Działu Marketingu',
  },
  {
    type: 'contact',
    label: 'Kom:',
    value: '+48 530 797 432',
  },
  {
    type: 'contact',
    label: 'Email:',
    value: 'm.danch@tsl-silesia.com.pl',
  },
  {
    type: 'contact',
    label: 'tl.wew:',
    value: '+48 32 282 90 62 - wew. 34',
  },
]
const marketingContactsRight = [
  {
    type: 'person',
    name: 'Paweł Dziurdzia',
    position: 'Spedytor',
  },
  {
    type: 'contact',
    label: 'Kom:',
    value: '+48 516 284 653',
  },
  {
    type: 'contact',
    label: 'Email:',
    value: 'p.dziurdzia@tsl-silesia.com.pl',
  },
  {
    type: 'contact',
    label: 'tl.wew:',
    value: '+48 32 282 90 62',
  },
]

export const MarketingContacts = () => {
  const pathname = usePathname()
  if (pathname === '/contacts') return null

  return (
    <Box
      sx={{
        height: '200px',
        backgroundColor: '#fff',
        display: {
          xs: 'none',
          md: 'flex',
        },
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: '#000',
      }}
    >
      {[marketingContactsLeft, marketingContactsMid, marketingContactsRight].map(
        (col, colIndex) => (
          <Box
            key={colIndex}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {col.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChevronRightIcon sx={{ color: '#8d004c' }} fontSize="small" />
                {item.type === 'person' ? (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2">{item.position}</Typography>
                  </Box>
                ) : (
                  <Typography variant="body2">
                    <strong>{item.label}</strong> {item.value}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ),
      )}
    </Box>
  )
}
