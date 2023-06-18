'use client'
import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"

function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <select className='select select-bordered'></select>
  }

  return (
    <select className='select select-bordered' value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="dark">Dark</option>
      <option value="night">Night</option>
      <option value="lofi">Lofi</option>
      <option value="synthwave">Synthwave</option>
      <option value="forest">Forest</option>
      <option value="retro">Retro</option>
    </select>
  )
}

export default ThemeSwitcher