import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InfoIcon from '@mui/icons-material/Info'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'

export interface IconsListItem {
  id: string
  icon: 'ChevronRight' | 'ChevronLeft' | 'Info' | 'Alert' | 'Check'
  text: string
}

export interface IconsListBlockProps {
  title?: string
  items?: IconsListItem[]
}

export const IconsListBlock: React.FC<IconsListBlockProps> = ({ title, items }) => {
  if (!items || items.length === 0) return null

  const iconMapping: Record<string, React.ReactNode> = {
    ChevronRight: <ChevronRightIcon sx={{ color: "#8d004c" }} />,
    ChevronLeft: <ChevronLeftIcon sx={{ color: "#8d004c" }} />,
    Info: <InfoIcon sx={{ color: "#8d004c" }} />,
    Alert: <ErrorOutlineIcon sx={{ color: "#8d004c" }} />,
    Check: <CheckIcon sx={{ color: "#8d004c" }} />
  }

  return (
    <Box sx={{ maxWidth:"86vw", margin:"auto"}}>
      {title && (
        <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemIcon>
              {iconMapping[item.icon] || item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
