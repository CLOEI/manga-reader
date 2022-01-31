import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';

import useSWR from 'swr';

import { useRouter } from 'next/router';
import Head from 'next/head';

import MangaCard from '../components/MangaCard';
import Manga from '../utils/Manga';
import Layout from '../components/Layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Discover() {
	const { data, error } = useSWR<IMangaList>(
		'/api/manga?includes[]=cover_art',
		fetcher
	);
	const router = useRouter();
	console.log(data);

	const goBack = () => {
		router.replace('/');
	};

	return (
		<Layout>
			<Head>
				<title>Discover</title>
			</Head>
			<header className="bg-gray-800 h-12 px-2 flex items-center justify-between text-gray-50">
				<button onClick={goBack}>
					<AiOutlineArrowLeft size={24} />
				</button>
				<AiOutlineSearch size={24} />
			</header>
			<main className="grid grid-cols-2 gap-2 p-2">
				{data &&
					data.data.map((context) => {
						const manga = new Manga(context);

						return <MangaCard key={manga.id} manga={manga} />;
					})}
			</main>
		</Layout>
	);
}

export default Discover;
