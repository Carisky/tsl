'use client'
import React, { JSX, useState } from 'react'
import { Box, Drawer, TextField, Button, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useForm, SubmitHandler } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'

interface FormValues {
  email: string
  question: string
}
interface MessageValues {
  sender: 'client' | 'system' | 'admin'
  text: string
}

export default function Chat(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageValues[]>([])
  const [systemMessageCount, setSystemMessageCount] = useState<number>(0)

  const systemMessages = (call: 'init' | 'process') => {
    if (systemMessageCount === 0 && call === 'init') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'system', text: 'hello we here to help u' }])
        setSystemMessageCount((prev) => prev + 1)
      }, 1500)
    }
    if (systemMessageCount === 1 && call === 'process') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'system', text: 'hello we got your message' }])
        setSystemMessageCount((prev) => prev + 1)
      }, 1500)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    systemMessages('init')
  }
  const handleClose = () => setOpen(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Добавляем сообщение клиента в состояние
    setMessages((prev) => [...prev, { sender: 'client', text: data.question }]);
    
    try {
      const res = await axios.post('/api/send-to-marketing', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) {
        systemMessages('process');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Axios error:', error);
    }
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        <Box
          sx={{
            backgroundColor: '#8d004c',
            height: 50,
            width: 50,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ChatIcon sx={{ color: '#fff' }} />
        </Box>
      </Box>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '70vw',
              md: '40vw',
              lg: '30vw',
            },
            p: 2,
            height: '100%',
          }}
        >
          <Box>
            <h2>Chat</h2>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              overflowY: 'auto',
              mb: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box key={`message-${index}`}>
                <Box
                  sx={{
                    backgroundColor: message.sender === 'system' ? '#2D2D2A' : '#4C4C47',
                    borderRadius: 4,
                    opacity: 0.7,
                  }}

                  mb={1}
                >
                  <Typography
                    sx={{
                      color: '#fff',
                      padding: 1,
                      wordWrap: 'break-word',
                    }}
                    variant="body1"
                  >
                    {message.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {messages.length < 2 ? (
            <Box sx={{ width: '100%' }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  {...register('email', {
                    required: 'Email required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Wrong email format',
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Question"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  {...register('question', { required: 'Qustion required' })}
                  error={Boolean(errors.question)}
                  helperText={errors.question?.message}
                />
                <Button
                  sx={{
                    width: {
                      xs: '100%',
                      md: '50%',
                      lg: '30%',
                    },
                    margin: 'auto',
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <SendIcon />
                </Button>
              </form>
            </Box>
          ):<Box sx={{flexGrow:1}}></Box>}
        </Box>
      </Drawer>
    </>
  )
}
