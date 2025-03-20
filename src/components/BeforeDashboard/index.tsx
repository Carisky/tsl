"use client"

import { Banner } from '@payloadcms/ui/elements/Banner'
import React, { useState, useEffect } from 'react'
import { FaSmile, FaRocket, FaLightbulb, FaCode, FaHeart } from 'react-icons/fa'

import './index.scss'

const baseClass = 'before-dashboard'

const texts = [
  'Welcome',
  'Make web great again',
  'Your site, your decision',
  "Don't ruin that, pls?..",
  'Innovation never sleeps'
]

const icons = [
  <FaSmile key="icon-0" />,
  <FaRocket key="icon-1" />,
  <FaLightbulb key="icon-2" />,
  <FaCode key="icon-3" />,
  <FaHeart key="icon-4" />
]

const BeforeDashboard: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length)
      setCurrentIconIndex(prev => (prev + 1) % icons.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <div style={{ display: 'flex', alignItems: 'center' }} className={`${baseClass}__content`}>
          <div style={{ marginRight: "10px" }} className={`${baseClass}__icon`}>
            {icons[currentIconIndex]}
          </div>
          {/* Ключ меняется, что приводит к перерисовке и запуску анимации */}
          <h4 key={currentTextIndex} className="fade-in">
            {texts[currentTextIndex]}
          </h4>
        </div>
      </Banner>
    </div>
  )
}

export default BeforeDashboard
