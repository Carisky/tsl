import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => (
  <Script
    id="theme-script"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        document.documentElement.setAttribute('data-theme', 'light');
      })();
      `,
    }}
  />
)