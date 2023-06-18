'use client'

import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useRouter } from 'next/navigation'

function Back() {
  const router = useRouter();

  const onClick = () => router.back()

  return (
    <button className="btn btn-ghost" onClick={onClick}><AiOutlineArrowLeft/></button>
  )
}

export default Back