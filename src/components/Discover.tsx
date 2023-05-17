'use client'

import { API, Manga } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

import useSWRInfinite from "swr/infinite";
import { motion } from "framer-motion";

function Discover() {
  const { data: discoveryData, setSize, size } = useSWRInfinite((index, prevData) => {
    if (prevData && !(prevData.data.length > 0)) return null;
    return index.toString();
  }, (offset: string) => API.getLatestUdates(32, parseInt(offset) * 32))

  if (!discoveryData) return null;

  const onViewportEnter = () => setSize(size + 1)

  return (
    <>
      {discoveryData.reduce((acc, curr) => {
        return acc.concat(curr.data)
      }, [] as Manga[]).map((data, i, arr) => {
        const coverArtIndex = data.relationships.findIndex(data => data.type === "cover_art");
          return (
            <Link href={`/manga/${data.id}`} key={i}>
              <div className='relative w-full aspect-[1/1.5] rounded-md overflow-hidden'>
                <Image src={API.getCoverArt(data.id, data.relationships[coverArtIndex].attributes!.fileName)} alt={data.id} sizes="256px" fill/>
              </div>
              <p className='break-words line-clamp-2'>{data.attributes.title.en}</p>
            </Link>
          )
      })}
      <motion.progress className='progress mx-auto col-span-2 md:col-span-6' onViewportEnter={onViewportEnter}/>
    </>
  )
}

export default Discover