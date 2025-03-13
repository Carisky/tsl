import React from 'react'
import { FiChevronRight, FiChevronLeft, FiInfo, FiAlertCircle, FiCheck } from 'react-icons/fi'

export interface IconsListItem {
  id: string
  icon: 'ChevronRight' | 'ChevronLeft' | 'Info' | 'Alert' | 'Check'
  text: string
}

export interface IconsListBlockProps {
  items?: IconsListItem[]
  disableInnerContainer?: boolean
}

export const IconsListBlock: React.FC<IconsListBlockProps> = ({
  items,
  disableInnerContainer,
}) => {
  if (!items || items.length === 0) {
    return null
  }

  // Используем компоненты из react-icons вместо простых символов
  const iconMapping: Record<string, React.ReactNode> = {
    ChevronRight: <FiChevronRight />,
    ChevronLeft: <FiChevronLeft />,
    Info: <FiInfo />,
    Alert: <FiAlertCircle />,
    Check: <FiCheck />,
  }

  return (
    <div className={disableInnerContainer ? '' : 'container'}>
      <ul className="icons-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="icons-list-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <span className="icon">
              {iconMapping[item.icon] || item.icon}
            </span>
            <span className="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
