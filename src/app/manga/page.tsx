import Discover from '@/components/Discover';

async function Page() {
  return (
    <main>
      <div className="navbar bg-base-100 shadow-lg">
        <h1 className='font-bold text-2xl'>Discover</h1>
      </div>
      <div className='grid grid-cols-2 gap-2 p-2 pb-20 md:grid-cols-6'>
        <Discover/>
      </div>
    </main>
  )
}

export default Page