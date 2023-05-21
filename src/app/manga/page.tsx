import Discover from '@/components/Discover';
import { Metadata } from 'next';
import { AiOutlineSearch } from "react-icons/ai"

export const metadata: Metadata = {
  title: "Discover"
}

async function Page() {
  return (
    <main>
      <div className="navbar bg-base-100 shadow-lg flex justify-between">
        <h1 className='font-bold text-2xl'>Discover</h1>
        <div className="flex-none">
          <label htmlFor='my-modal' className="btn btn-square btn-ghost">
            <AiOutlineSearch size={24}/>
          </label>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 p-2 pb-20 md:grid-cols-6'>
        <Discover/>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box" htmlFor="">
          <h2 className="font-bold text-lg">Search</h2>
          <form autoComplete="off">
            <input type="text" className='input input-bordered w-full my-2' placeholder='Oshi No k..' name="search"/>
            <button className="btn ml-auto flex" type="submit">Search</button>
          </form>
        </label>
      </label>
    </main>
  )
}

export default Page