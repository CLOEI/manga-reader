'use client'

import { API, Manga } from '@/utils/api'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const MangaCard = React.forwardRef<HTMLAnchorElement, { data: Manga }>(({ data }, ref) => {
  const coverArtIndex = data.relationships.findIndex(data => data.type === "cover_art");
  const fileName = data.relationships[coverArtIndex]?.attributes?.fileName ?? null
  const coverURL = API.getCoverArt(data.id, fileName)

  return (
    <Link href={`/manga/${data.id}`} ref={ref}>
      <div className='relative w-full aspect-[1/1.5] bg-base-200 rounded-md overflow-hidden'>
        {coverURL && <Image unoptimized src={`/api?url=${encodeURIComponent(coverURL)}`} alt={data.id} sizes="256px" fill/>}
      </div>
      <p className='break-words line-clamp-2'>{data.attributes.title.en}</p>
    </Link>
  )
})

MangaCard.displayName = 'MangaCard'

export default MangaCard