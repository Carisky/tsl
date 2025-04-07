'use client'
import React, { JSX, useRef, useState } from 'react'
import { Box, Drawer, TextField, Button, Typography, Divider, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useForm, SubmitHandler } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import CloseIcon from '@mui/icons-material/Close'
import AttachFileIcon from '@mui/icons-material/AttachFile'
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
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<MessageValues[]>([])
  const [systemMessageCount, setSystemMessageCount] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    files.forEach((file) => formData.append('images', file))

    setMessages((prev) => [...prev, { sender: 'client', text: data.question }])

    try {
      const res = await axios.post('/api/send-to-marketing', formData)
      if (res.status === 200) {
        systemMessages('process')
        setFiles([]) // очистить после отправки
      } else {
        console.error('Error sending email')
      }
    } catch (error) {
      console.error('Axios error:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files).slice(0, 3)
    setFiles(selected)
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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ height: 60, width: 60 }}>
                <img
                  style={{ borderRadius: '50%', aspectRatio: '1/1' }}
                  src="/media/chat_promo.png"
                  alt=""
                />
              </Box>
              <Typography sx={{ color: '#fff', fontSize: '24px' }}>
                Chat with TSL Silesia
              </Typography>
            </Box>
            <ExpandMoreIcon
              onClick={handleClose}
              sx={{ fontSize: '40px', cursor: 'pointer', color: '#fff' }}
            />
          </Box>

          <Box sx={{ display:"flex", flexDirection:"column",flexGrow: 1, overflowY: 'auto', mb: 2, p: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={`message-${index}`}
                sx={{ width:"fit-content",maxWidth:"70%",alignSelf: message.sender === 'system' ? 'flex-start' : 'flex-end' }}
              >
                <Box
                  sx={{
                    background:
                      message.sender === 'system'
                        ? 'linear-gradient(to right, #0aa6a0, #2bb8a0)'
                        : 'linear-gradient(to right,rgb(10, 15, 166),rgb(43, 111, 184))',
                    borderRadius: 4,
                    opacity: 0.7,
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: '#fff', p: 1 }}>{message.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {messages.length < 2 ? (
            <Box sx={{ width: '100%', p: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => fileInputRef.current?.click()}>
                    <AttachFileIcon sx={{ color: '#1976d2' }} />
                  </IconButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Attach up to 3 images
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {files.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          setFiles((prev) => prev.filter((_, i) => i !== index))
                        }}
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          backgroundColor: '#fff',
                          zIndex: 2,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <TextField
                  label="Email"
                  variant="filled"
                  type="email"
                  fullWidth
                  margin="normal"
                  {...register('email', {
                    required: 'Email required',
                    pattern: { value: /^\S+@\S+$/, message: 'Wrong email format' },
                  })}
                  error={!!errors.email}
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
                  {...register('question', { required: 'Question required' })}
                  error={!!errors.question}
                  helperText={errors.question?.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    width: { xs: '100%', md: '50%', lg: '30%' },
                    margin: 'auto',
                  }}
                >
                  <SendIcon />
                </Button>
              </form>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                width: '50%',
                margin: 'auto',
                mb: 2,
                backgroundColor: '#a1cfd1',
                borderRadius: '10px',
                position: 'relative',
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
