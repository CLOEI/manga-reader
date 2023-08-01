import { API } from '@/utils/api'
import Image from 'next/image'
import Paginate from '@/components/Paginate'
import Back from '@/components/Back'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import Chapter from '@/components/Chapter'
import BookmarkButton from '@/components/BookmarkButton'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    page?: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mangaData = await API.getManga(params.id);
  return {
    title: mangaData.attributes.title.en || 'Unknown',
  }
}

async function Page({ params, searchParams }: Props) {
  const mangaData = API.getManga(params.id);
  const mangaStats = API.getMangaStats(params.id);
  const chaptersData = API.getChapters(params.id, searchParams?.page || 1);
  const [ data, stats, chapters ] = await Promise.all([mangaData, mangaStats, chaptersData]);

  const coverArtIndex = data.relationships.findIndex(data => data.type === "cover_art");
  const authorIndex = data.relationships.findIndex(data => data.type === "author");
  const coverURL = API.getCoverArt(data.id, data.relationships[coverArtIndex]?.attributes?.fileName ?? null)
  const coverArt = coverURL ? `/api?url=${encodeURIComponent(coverURL)}` : ''

  const totalPage = Math.ceil(chapters.total / chapters.limit);
  const rating = stats.statistics[params.id].rating.bayesian;

  return (
    <main>
      <div className="navbar absolute z-10">
        <Back/>
      </div>
      <div className='h-64 relative overflow-hidden'>
        <Image unoptimized src={coverArt} alt={params.id} fill style={{objectFit: "cover"}}	/>
        <div className='absolute inset-0 bg-gradient-to-t from-base-100'></div>
      </div>
      <div className='p-2 pb-20'>
        <div className='grid grid-cols-6 -mt-32 gap-2'>
          <div className='relative aspect-[1/1.5] row-span-3 col-span-2 bg-base-200 md:col-span-1'>
            <Image unoptimized src={coverArt} alt={params.id} fill style={{objectFit: "cover"}} sizes="256px"	/>
          </div>
          <div className='relative z-10 col-span-4 md:col-span-5'>
            <h1 className='text-2xl font-bold'>{data.attributes.title.en}</h1>
            <p>Author : {data.relationships[authorIndex].attributes!.name}</p>
            <p>Status : {data.attributes.status}</p>
            <div className="flex items-center space-x-1">
              <a className='btn mt-2' href={`https://mangadex.org/title/${params.id}`} target='_blank' rel='noreferrer'>On MangaDex</a>
              <BookmarkButton id={data.id}/>
            </div>
          </div>
          <ReactMarkdown className='col-span-6 md:col-span-5 h-max' components={{
            a: ({node, ...props}) => {
              return <a {...props} className='link' target='_blank' rel='noreferrer'/>
            }
          }}>{data.attributes.description.en}</ReactMarkdown>
          <div className='flex flex-wrap col-span-6 gap-1 md:col-span-5'>
            {data.attributes.tags.map(tag => {
              return <span key={tag.id} className='badge whitespace-nowrap'>{tag.attributes.name.en}</span>
            })}
          </div>
        </div>
        <div className="divider"></div>
        <h2 className='text-xl font-bold my-2'>Chapters ({chapters.total})</h2>
        <div className='overflow-hidden'>
          {(chapters.data as Chapter[]).map(chapter => {
            return <Chapter key={chapter.id} chapter={chapter} />
          })}
        </div>
        <div className="flex justify-center py-4">
          <Paginate id={data.id} totalPage={totalPage}/>
        </div>
      </div>
    </main>
  )
}

export default Page