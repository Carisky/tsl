import React from 'react'
import { FiChevronRight, FiChevronLeft, FiInfo, FiAlertCircle, FiCheck } from 'react-icons/fi'

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
  if (!items || items.length === 0) {
    return null
  }

  const iconMapping: Record<string, React.ReactNode> = {
    ChevronRight: <FiChevronRight className='text-firmAccent' strokeWidth={3}/>,
    ChevronLeft: <FiChevronLeft className='text-firmAccent' strokeWidth={3}/>,
    Info: <FiInfo className='text-firmAccent' strokeWidth={3}/>,
    Alert: <FiAlertCircle className='text-firmAccent' strokeWidth={3}/>,
    Check: <FiCheck className='text-firmAccent' strokeWidth={3}/>,
  }

  return (
    <div className="container">
      {title && <h2 className="text-2xl text-firmAccent font-semibold mb-4">{title}</h2>}
      <ul className="icons-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="icons-list-item flex items-center gap-2 mb-2"
          >
            <span className="icon text-2xl">{iconMapping[item.icon] || item.icon}</span>
            <span className="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
