import React from 'react'
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md"

function Page() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <h1 className='font-bold text-2xl'>Offline</h1>
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <MdSignalWifiStatusbarConnectedNoInternet4 size={128}/>
        <p>You went offline!</p>
      </div>
    </div>
  )
}

export default Page