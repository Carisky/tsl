"use client";
import { useLocaleStore } from '@/app/(frontend)/store/useLocaleStore';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface Contact {
  id: string;
  group: string | { name: string };
  media?: { url: string };
  name: string;
  tel: {
    primary: string;
    wew?: string;
  };
  email: string;
  position: string;
}

const ContactsList: React.FC = () => {
  const { locale } = useLocaleStore();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Тексты для локалей
  const translations = {
    loading: {
      ru: "Загрузка...",
      ua: "Завантаження...",
      en: "Loading...",
      pl: "Ładowanie..."
    },
    error: {
      ru: "Извините, произошла ошибка загрузки контактов",
      ua: "Вибачте, сталася помилка завантаження контактів",
      en: "Sorry, there was an error loading contacts",
      pl: "Przepraszamy, wystąpił błąd podczas ładowania kontaktów"
    }
  };

  type SupportedLocale = 'ru' | 'ua' | 'en' | 'pl';

  const localeKey: SupportedLocale = (locale && ['ru', 'ua', 'en', 'pl'].includes(locale))
    ? locale as SupportedLocale
    : 'en';
  
  const loadingText = translations.loading[localeKey];
  const errorText = translations.error[localeKey];
  

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`/api/contacale=${locale}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setContacts(data.docs);
      } catch (err: any) {
        console.error(err);
        setError('error'); // Значение error не используется напрямую, только как индикатор
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    };
    fetchContacts();
  }, [locale]);

  if (loading) {
    return (
      <Snackbar open={true}>
        <Alert severity="info" variant="filled">
          {loadingText}
        </Alert>
      </Snackbar>
    );
  }

  if (error) {
    return (
      <Snackbar open={true}>
        <Alert 
          sx={{
            display:"flex",
            alignItems:"center"
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
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" sx={{ color: 'common.white' }}>X</Typography>
            </Box>
          }
        >
          {errorText}
        </Alert>
      </Snackbar>
    );
  }

  // Группировка контактов по group.name или group (если строка)
  const groupedContacts = contacts.reduce((acc: Record<string, Contact[]>, contact) => {
    const groupName =
      typeof contact.group === 'object' && contact.group !== null
        ? contact.group.name
        : contact.group;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(contact);
    return acc;
  }, {});

  return (
    <Box sx={{ maxWidth: "86vw", margin: "auto" }}>
      {Object.keys(groupedContacts).map((groupKey) => (
        <Accordion key={groupKey}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">{groupKey}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {groupedContacts[groupKey]!.map((contact) => (
              <Box
                key={contact.id}
                sx={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}
              >
                {contact.media && (
                  <img
                    src={contact.media.url}
                    alt={contact.name}
                    style={{ maxWidth: '100px' }}
                  />
                )}
                <Typography variant="h6">{contact.name}</Typography>
                <Typography>
                  <strong>Position:</strong> {contact.position}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {contact.tel.primary}
                </Typography>
                {contact.tel.wew && (
                  <Typography>
                    <strong>Additional Phone:</strong> {contact.tel.wew}
                  </Typography>
                )}
                <Typography>
                  <strong>Email:</strong> {contact.email}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ContactsList;
