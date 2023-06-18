import BookmarkButton from '@/components/BookmarkButton'
import { API, Chapter } from '@/utils/api'
import extractChapterData from '@/utils/extractChapterData'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: {
    id?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mangaData = await API.getChapter(params.id!);
  const { title, mangaTitle } = extractChapterData(mangaData.data as Chapter);
  return {
    title: title || mangaTitle,
  }
}

async function Page({ params }: Props) {
  const { manga, images } = await API.getChapterImages(params.id!)

  return (
    <div className='max-w-sm mx-auto relative pb-20'>
      {images.map((file: string, i: number) => {
        return (
          <div className="relative aspect-[1/1.5]" key={i}>
            <Image unoptimized src={file} alt="" fill/>
          </div>
        )
      })}
      <p className='py-10 text-center'>This is the end of the chapter~</p>
      <div className="fixed top-2 right-2 tooltip tooltip-bottom" data-tip="Bookmark">
        <BookmarkButton id={manga.id}/>
      </div>
    </div>
  )
}

export default Page