'use client'
import { Chapter } from "@/utils/api";
import Link from "next/link";

function Chapter({ chapter } : { chapter : Chapter }) {
  return (
    <Link href={chapter.attributes.externalUrl || `/read/${chapter.id}`} className='btn btn-outline w-full justify-start text-left mb-1' key={chapter.id}>
      <p>{chapter.attributes.volume && `v.${chapter.attributes.volume} `}{chapter.attributes.chapter && `c.${chapter.attributes.chapter} ${chapter.attributes.title ? '- ' : ''}`}{chapter.attributes.title}</p>
    </Link>
  )
}

export default Chapter