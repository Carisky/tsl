"use client";
import { useLocaleStore } from '@/app/(frontend)/store/useLocaleStore';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Contact {
  id: string;
  group: string;
  media?: { url: string };
  name: string;
  tel: {
    primary: string;
    wew?: string;
  };
  email: string;
  position: string;
}

// Отображение читаемых названий групп
const groupLabels: Record<string, string> = {
  marketing: 'Marketing',
  sales: 'Sales',
  it: 'IT',
  other: 'Other',
};

const ContactsList: React.FC = () => {
  const { locale } = useLocaleStore();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`/api/contacts?depth=1&locale=${locale}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setContacts(data.docs);
      } catch (err: any) {
        console.error(err);
        setError('Ошибка при загрузке контактов');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [locale]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  // Группируем контакты по group
  const groupedContacts = contacts.reduce((acc: Record<string, Contact[]>, contact) => {
    if (!acc[contact.group]) acc[contact.group] = [];
    acc[contact.group]!.push(contact);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedContacts).map((groupKey) => (
        <Accordion key={groupKey}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{groupLabels[groupKey] || groupKey}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {groupedContacts[groupKey]!.map((contact) => (
              <div
                key={contact.id}
                style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}
              >
                {contact.media && (
                  <img
                    src={contact.media.url}
                    alt={contact.name}
                    style={{ maxWidth: '100px' }}
                  />
                )}
                <h2>{contact.name}</h2>
                <p>
                  <strong>Position:</strong> {contact.position}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.tel.primary}
                </p>
                {contact.tel.wew && (
                  <p>
                    <strong>Additional Phone:</strong> {contact.tel.wew}
                  </p>
                )}
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ContactsList;
