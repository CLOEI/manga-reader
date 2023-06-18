'use client'

import { API, Manga } from "@/utils/api";
import { useEffect } from "react"
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import useSWRInfinite from "swr/infinite";
import { useInView } from 'react-intersection-observer';
import Emoji from "./Emoji";
import MangaCard from "./MangaCard";

function Discover() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data: discoveryData, setSize, size, isLoading, isValidating } = useSWRInfinite((index, prevData) => {
    if (prevData && !(prevData.data.length > 0)) return null; 
    return index.toString();
  }, (offset: string) => API.getLatestUdates(32, parseInt(offset) * 32, search))
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  });

  useEffect(() => {
    if(inView) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]) // If we didnt disable the eslint, it will cause an infinite loop

  if (!discoveryData || isLoading) {
    return <Emoji emoji="(＾▽＾)" status="Loading..."/>
  }

  return (
    <>
      {discoveryData.reduce((acc, curr) => {
        return acc.concat(curr.data)
      }, [] as Manga[]).map((data, i, arr) => {
          return (
            <div key={i}>
              {i === arr.length - 1 ? <MangaCard data={data} ref={ref}/> : <MangaCard data={data}/>}
            </div>
          )
      })}
      {isValidating && <progress className='progress mx-auto col-span-2 md:col-span-6'/>}
    </>
  )
}

export default Discover