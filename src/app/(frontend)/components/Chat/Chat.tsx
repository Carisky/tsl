'use client'
import React, { JSX, useState } from 'react'
import { Box, Drawer, TextField, Button, Typography, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useForm, SubmitHandler } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import axios from 'axios'
import './styles.scss'
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
  const [file, setFile] = useState<File | null>(null)
  const systemMessages = (call: 'init' | 'process') => {
    if (systemMessageCount === 0 && call === 'init') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'system', text: 'We here to help u wih your questions' },
        ])
        setSystemMessageCount((prev) => prev + 1)
      }, 1500)
    }
    if (systemMessageCount === 1 && call === 'process') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'system', text: 'We got your message' }])
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
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('question', data.question)
    if (file) formData.append('image', file)
  
    setMessages((prev) => [...prev, { sender: 'client', text: data.question }])
  
    try {
      const res = await axios.post('/api/send-to-marketing', formData)
      if (res.status === 200) {
        systemMessages('process')
      } else {
        console.error('Error sending email')
      }
    } catch (error) {
      console.error('Axios error:', error)
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
            backgroundColor: '#dedede',
            height: 75,
            width: 75,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1.5,
          }}
        >
          <img src="/media/chat.png" />
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
            height: '100%',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              background: 'linear-gradient(to right, #3bb8b0, #3dd8b0)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                '@media (max-width:767px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <Box
                sx={{ height: 60, width: 60, borderRadius: '50%',  }}
              >
                <img style={{borderRadius: '50%', aspectRatio:"1/1"}} src="/media/chat_promo.png" alt="" />
              </Box>
              <Box
                sx={{ ml: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    '@media (max-width:767px)': {
                      fontSize: '16px',
                    },
                    fontSize: '24px',
                  }}
                >
                  Chat with
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    '@media (max-width:767px)': {
                      fontSize: '16px',
                    },
                    fontSize: '24px',
                  }}
                >
                  TSL Silesia
                </Typography>
              </Box>
            </Box>
            <ExpandMoreIcon
              onClick={() => {
                handleClose()
              }}
              sx={{ fontSize: '40px', cursor: 'pointer', color: '#fff' }}
            />
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <defs>
                  <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3bb8b0" />
                    <stop offset="100%" stopColor="#3dd8b0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#myGradient)"
                  fillOpacity="1"
                  d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,170.7C672,139,768,117,864,117.3C960,117,1056,139,1152,165.3C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </Box>
            <Typography
              sx={{
                color: '#fff',
                position: 'absolute',
                top: 0,
                left: 10,
                '@media (max-width:767px)': {
                  top: -10,
                },
              }}
            >
              We here to help u
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              overflowY: 'auto',
              mb: 2,
              p: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={`message-${index}`}
                sx={{ alignSelf: message.sender === 'system' ? 'flex-start' : 'flex-end' }}
              >
                <Box
                  sx={{
                    background:
                      message.sender === 'system'
                        ? 'linear-gradient(to right, #0aa6a0, #2bb8a0)'
                        : 'linear-gradient(to right,rgb(10, 15, 166),rgb(43, 111, 184))',
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
            <Box sx={{ width: '100%', p: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <TextField
                  label="Email"
                  variant="filled"
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
                <Divider sx={{ height: '2px', backgroundColor: '#8d004c' }} />
                <TextField
                  label="Question"
                  variant="filled"
                  multiline
                  rows={2}
                  fullWidth
                  margin="normal"
                  {...register('question', { required: 'Qustion required' })}
                  error={Boolean(errors.question)}
                  helperText={errors.question?.message}
                />
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
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
          ) : (
            <Box
              sx={{
                position: 'relative',
                flexGrow: 1,
                width: '50%',
                margin: 'auto',
                mb: 2,
                backgroundColor: '#a1cfd1',
                borderRadius: '10px',
              }}
            >
              <Box
                className="foolishIn"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: '10px',
                  backgroundColor: '#8d004c',
                }}
              >
                <MarkEmailUnreadIcon sx={{ color: '#fff', fontSize: '50px' }} />
                <Typography className="fadeIn" sx={{ textAlign: 'center', color: '#fff' }}>
                  Wait for our response
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  )
}
