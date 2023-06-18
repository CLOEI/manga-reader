'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' themes={['dark', 'night', 'lofi', 'synthwave', 'forest', 'retro']}>
      {children}
    </ThemeProvider>
  )
}

export default Provider