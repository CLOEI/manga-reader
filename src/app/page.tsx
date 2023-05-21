import Emoji from "@/components/Emoji"

export default function Home() {
  return (
    <main>
      <div className="navbar bg-base-100 shadow-lg">
        <h1 className='font-bold text-2xl'>Manga</h1>
      </div>
      <Emoji emoji="( •_•)" status="No data..."/>
    </main>
  )
}
