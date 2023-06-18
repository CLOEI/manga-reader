import ThemeSwitcher from "@/components/ThemeSwitcher"
import { AiOutlineInfoCircle } from "react-icons/ai"

function Info() {
  return (
    <main>
      <div className="navbar bg-base-100 shadow-lg">
        <h1 className='font-bold text-2xl'>Info</h1>
      </div>
      <div className="px-2">
        <div className='alert alert-warning shadow-lg'>
          <div>
            <AiOutlineInfoCircle/>
            Still under development
          </div>
        </div>
        <div className='my-20'>
          <div className='w-max mx-auto mt-20 mb-10'>
            <AiOutlineInfoCircle size={64}/>
            <p>Updates</p>
          </div>
          <div className='w-max mx-auto'>
            <ThemeSwitcher/>
          </div>
          <div className='mt-2 space-y-2'>
            <div>
              <p>Date : 19/06/2023</p>
              <p>- Added themes selector</p>
              <p>- Markdown support</p>
              <p>- Bypass restriction</p>
            </div>
            <div>
              <p>Date : 08/06/2023</p>
              <p>- Intialize PWA</p>
            </div>
            <div>
              <p>Date : 31/05/2023</p>
              <p>- Fix infinite request</p>
              <p>- Fix on pagination scroll layout re-rendered</p>
            </div>
            <div>
              <p>Date : 30/05/2023</p>
              <p>- Bookmark manga</p>
              <p>- Read & view chapter</p>
            </div>
            <div>
              <p>Date : 21/05/2023</p>
              <p>- Functional search feature</p>
              <p>- Add metadata</p>
              <p>- Emojis</p>
            </div>
            <div>
              <p>Date : 18/05/2023</p>
              <p>- Added information tab</p>
              <p>- Modal for searching comics</p>
            </div>
            <div>
              <p>Date : 17/05/2023</p>
              <p>- Added infinite scroll pagination</p>
            </div>
            <div>
              <p>Date : 16/05/2023</p>
              <p>- Revamp overall design</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Info