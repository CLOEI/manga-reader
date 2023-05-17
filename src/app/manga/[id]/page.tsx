import { API } from '@/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Paginate from '@/components/Paginate'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    page?: number
  }
}

async function Page({ params, searchParams }: Props) {
  const mangaData = API.getManga(params.id);
  const chaptersData = API.getChapters(params.id, searchParams?.page || 1);
  const [ data, chapters ] = await Promise.all([mangaData, chaptersData]);

  const coverArtIndex = data.relationships.findIndex(data => data.type === "cover_art");
  const authorIndex = data.relationships.findIndex(data => data.type === "author");
  const coverArt = API.getCoverArt(params.id, data.relationships[coverArtIndex].attributes!.fileName)

  const totalPage = Math.ceil(chapters.total / chapters.limit);

  return (
    <main>
      <div className="navbar absolute z-10">
        <Link href="/" className="btn btn-ghost normal-case text-xl"><AiOutlineArrowLeft/></Link>
      </div>
      <div className='h-64 relative overflow-hidden'>
        <Image src={coverArt} alt={params.id} fill style={{objectFit: "cover"}}	/>
        <div className='absolute inset-0 bg-gradient-to-t from-base-100'></div>
      </div>
      <div className='p-2 pb-20'>
        <div className='grid grid-cols-6 -mt-32 gap-2'>
          <div className='relative aspect-[1/1.5] row-span-3 col-span-2 bg-base-200 md:col-span-1'>
            <Image src={coverArt} alt={params.id} fill style={{objectFit: "cover"}} sizes="256px"	/>
          </div>
          <div className='relative z-10 col-span-4 md:col-span-5'>
            <h1 className='text-2xl font-bold'>{data.attributes.title.en}</h1>
            <p>Author : {data.relationships[authorIndex].attributes!.name}</p>
            <p>Status : {data.attributes.status}</p>
            <button className='btn mt-2'>Add to library</button>
          </div>
          <p className='col-span-6 md:col-span-5 h-max'>{data.attributes.description.en}</p>
          <div className='flex flex-wrap col-span-6 gap-1 md:col-span-5'>
            {data.attributes.tags.map(tag => {
              return <span key={tag.id} className='badge whitespace-nowrap'>{tag.attributes.name.en}</span>
            })}
          </div>
        </div>
        <div className="divider"></div>
        <h2 className='text-xl font-bold my-2'>Chapters ({chapters.total})</h2>
        <div className='overflow-hidden'>
          {chapters.data.map(chapter => {
            return <button className='btn btn-outline w-full justify-start text-left mb-1' key={chapter.id}>
              <p className=''>{chapter.attributes.volume && `v.${chapter.attributes.volume} `}{chapter.attributes.chapter && `c.${chapter.attributes.chapter} ${chapter.attributes.title ? '- ' : ''}`}{chapter.attributes.title}</p>
            </button>
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