"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import Cookies from 'js-cookie';

const translations = {
  pl: {
    info: 'Używamy plików cookie, aby ulepszyć działanie strony i analizować ruch. Zapoznaj się z naszą polityką prywatności.',
    accept: 'Przyjmij politykę',
    read: 'Przeczytaj więc',
  },
  ru: {
    info: 'Мы используем файлы cookie для улучшения работы сайта и анализа трафика. Ознакомьтесь с нашей политикой конфиденциальности.',
    accept: 'Принять',
    read: 'Прочитай больше',
  },
  ua: {
    info: 'Ми використовуємо файли cookie для покращення роботи сайту та аналізу трафіку. Ознайомтеся з нашою політикою конфіденційності.',
    accept: 'Прийняти',
    read: 'Прочитайте більше',
  },
  en: {
    info: 'We use cookies to enhance site performance and analyze traffic. Please review our privacy policy.',
    accept: 'Accept policy',
    read: 'Read more',
  },
};

export default function PrivacyPolicy() {
  // Изначально ставим значение по умолчанию
  const [locale, setLocale] = useState('pl');
  // Флаг, показывающий, что компонент смонтирован (только на клиенте)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cookieLocale = Cookies.get("locale");
    if (cookieLocale && cookieLocale in translations) {
      setLocale(cookieLocale);
    }
    setMounted(true);
  }, []);

  if (!mounted) return null; // не рендерим до монтирования

  const t = translations[locale as keyof typeof translations];

  const handleAccept = () => setVisible(false);
  const handleRead = () => window.open('/privacy-policy', '_blank');

  if (!visible) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        zIndex: 1300,
        maxWidth: 600,
        width: '90%',
      }}
    >
      <Typography variant="body1" align="center">
        {t.info}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          {t.accept}
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRead}>
          {t.read}
        </Button>
      </Box>
    </Paper>
  );
}
