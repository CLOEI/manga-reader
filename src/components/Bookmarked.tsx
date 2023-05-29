'use client'

import useLocalStorage from '@/utils/useLocalStorage';
import React, { useEffect, useState } from 'react'
import Emoji from './Emoji';
import { API, Manga } from '@/utils/api';
import MangaCard from './MangaCard';

function Bookmarked() {
  const [mangas] = useLocalStorage('mangas', []);
  const [data, setData] = useState<Manga[]>([])

  useEffect(() => {
    if(mangas.length > 0) {
      API.getMangasByIds(mangas).then(data => setData(data.data))
    }
  }, [mangas])

  return (
    <>
      {data.length > 0 ? data.map((manga, i) => <MangaCard data={manga} key={i}/>) : <Emoji emoji="( •_•)" status="No data..."/>}
    </>
  )
}

export default Bookmarked