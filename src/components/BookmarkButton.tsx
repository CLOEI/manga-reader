'use client'

import useLocalStorage from '@/utils/useLocalStorage'
import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

type Params = {
  id: string
}

function BookmarkButton({ id }: Params) {
  const [mangas, setMangas] = useLocalStorage<string[]>("mangas", []);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onClick = () => {
    if (mangas.includes(id)) {
      setMangas(mangas.filter((manga) => manga !== id))
    } else {
      setMangas([...mangas, id])
    }
  }

  const icon = mangas.includes(id) ? <BsBookmarkFill/> : <BsBookmark/>

  return (
    <>
      {loaded ? <button className='btn mt-2' onClick={onClick}>{icon}</button> : null}
    </>
  )
}

export default BookmarkButton