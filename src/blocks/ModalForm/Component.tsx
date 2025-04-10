'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useState } from 'react'
import { Modal, Box, IconButton, Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FormBlock } from '../Form/Component'

export interface ModalFormBlockProps {
  buttonText: string
  form: FormType
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  width: '100%',
  maxWidth: '600px',
  outline: 'none',
}

export const ModalForm: React.FC<ModalFormBlockProps> = ({ buttonText, form }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!form?.id) return null

  return (
    <>
      <Button
        sx={{
          backgroundColor: '#8d004c',
          padding: '20px',
          borderRadius:"0"
        }}
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        <Typography>{buttonText}</Typography>
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="modal-form">
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <FormBlock id={form.id} enableIntro={false} form={form} introContent={undefined} />
        </Box>
      </Modal>
    </>
  )
}
