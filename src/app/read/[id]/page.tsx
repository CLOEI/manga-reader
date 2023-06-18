import BookmarkButton from '@/components/BookmarkButton'
import { API, Chapter } from '@/utils/api'
import extractChapterData from '@/utils/extractChapterData'
import { Metadata } from 'next'
import Image, { ImageLoaderProps } from 'next/image'
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
    <div className='w-max mx-auto relative pb-20'>
      {images.map((file: string, i: number) => {
        return <Image unoptimized src={`/api?url=${encodeURIComponent(file)}`} alt="" width={256} height={256} key={i}/>
      })}
      <p className='py-10 text-center'>This is the end of the chapter~</p>
      <div className="fixed top-2 right-2 tooltip tooltip-bottom" data-tip="Bookmark">
        <BookmarkButton id={manga.id}/>
      </div>
    </div>
  )
}

export default Page