import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import palette from '@/palette'

// Импортируем необходимые компоненты и иконки из MUI
import { Grid, Typography, Box } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import InfoIcon from '@mui/icons-material/Info'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  // Стили для захардкоженной информации компании
  const textSx = { color: '#FFFFFF', fontWeight: 600 }
  const iconSx = { color: '#8d004c' }


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
  
  const marketingContactsRight = [
    {
      type: 'person',
      name: 'Paweł Dziurdzia',
      position: 'Asystent ds. marketingu',
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
  
  

  return (
    <footer
      style={{ backgroundColor: palette.footer.bg }}
      className="mt-auto border-t border-border bg-black dark:bg-card text-white"
    >
      <Box
        sx={{
          height: '200px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          color:"#000"
        }}
      >
<Box
  sx={{
    height: '200px',
    backgroundColor: '#fff',
    display: {
      xs: 'none',
      md: 'flex',
    },
    justifyContent:"space-around",
    alignItems: 'center',
    color: '#000',
  }}
>
  {[marketingContactsLeft, marketingContactsRight].map((col, colIndex) => (
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
  ))}
</Box>

      </Box>
      <div className="px-6 py-2 gap-2 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo className="min-w-20 w-20 h-20" />
        </Link>
        {/* Захардкоженная информация о компании */}
        <Box
          sx={{
            maxWidth: '80%',
          }}
          component="div"
        >
          <Grid container spacing={2}>
            {/* Первый столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <BusinessIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  TSL Silesia Sp. z o.o.
                </Typography>
              </Box>
            </Grid>

            {/* Второй столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  ul. Rycerska 9<br />
                  41-902 Bytom Śląskie, Polska
                </Typography>
              </Box>
            </Grid>

            {/* Третий столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  +48 32 282 90 62
                  <br />
                  +48 32 281 34 02
                </Typography>
              </Box>
            </Grid>

            {/* Четвертый столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  tsl-silesia.com.pl
                </Typography>
              </Box>
            </Grid>

            {/* Пятый столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <DescriptionIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  KRS: 0000178847 - VIII Wydz. Gosp. w. Katowicach
                </Typography>
              </Box>
            </Grid>

            {/* Шестой столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <AccountBalanceIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  Kapitał zakładowy: 50 000 PLN
                </Typography>
              </Box>
            </Grid>

            {/* Седьмой столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <AssignmentIndIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  NIP: PL6262721695
                </Typography>
              </Box>
            </Grid>

            {/* Восьмой столбец */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <InfoIcon sx={{ mr: 1, ...iconSx }} />
                <Typography sx={textSx} variant="body2">
                  Regon: 278125418
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />

          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink className="text-white" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
