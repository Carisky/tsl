'use client'

import {
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  ButtonBase,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Service {
  id: string;
  name: string;
  iconUrl: string;
}

export default function InquiryForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    importExport: 'import',
  });

  useEffect(() => {
    fetch('/api/services/?depth=1')
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.docs.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          iconUrl: doc.icon?.sizes?.thumbnail?.url || doc.icon?.url || '',
        }));
        setServices(transformed);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={{ xs: 2, md: 6 }}>
      <Grid container spacing={4}>
        {/* Левая часть — форма */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Formularz zapytania
          </Typography>
          <TextField
            fullWidth
            required
            label="Imię i nazwisko"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            InputProps={{ sx: { borderColor: 'red' } }}
          />
          <TextField
            fullWidth
            required
            label="Nazwa firmy"
            name="company"
            value={form.company}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Numer telefonu"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Adres e‑mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Import/eksport
            </Typography>
            <RadioGroup
              row
              name="importExport"
              value={form.importExport}
              onChange={handleChange}
            >
              <FormControlLabel value="import" control={<Radio />} label="Import" />
              <FormControlLabel value="export" control={<Radio />} label="Eksport" />
            </RadioGroup>
          </Box>
        </Grid>

        {/* Правая часть — выбор услуги */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Wybierz usługę
          </Typography>
          <Grid container spacing={2}>
            {services.map((svc) => (
              <Grid item xs={6} key={svc.id}>
                <ButtonBase
                  onClick={() => setSelectedService(svc.id)}
                  sx={{
                    width: '100%',
                    border: selectedService === svc.id ? '2px solid red' : '1px solid #ccc',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    textAlign: 'center',
                    '&:hover': {
                      borderColor: 'red',
                    },
                  }}
                >
                  <img
                    src={svc.iconUrl}
                    alt={svc.name}
                    style={{ width: 40, height: 40, marginBottom: 8 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'primary.main', fontWeight: 500 }}
                  >
                    {svc.name}
                  </Typography>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
