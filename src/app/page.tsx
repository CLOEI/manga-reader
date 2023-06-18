import Bookmarked from "@/components/Bookmarked"

export default function Home() {
  return (
    <main>
      <div className="navbar bg-base-100 shadow-lg">
        <h1 className='font-bold text-2xl'>Manga</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 pb-20 md:grid-cols-6">
        <Bookmarked/>
      </div>
    </main>
  )
}
