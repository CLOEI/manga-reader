import React from 'react'

type Props = {
  emoji: string,
  status: string,
}

function Emoji({ emoji, status }: Props) {
  return (
    <div className="font-bold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center w-full whitespace-nowrap">
      <p className="text-5xl">{emoji}</p>
      <p>{status}</p>
    </div>
  )
}

export default Emoji