import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import { useState, useRef } from 'react';
import useSWR from 'swr';

import { useRouter } from 'next/router';
import Head from 'next/head';

import MangaCard from '../components/MangaCard';
import Manga from '../utils/Manga';
import Layout from '../components/Layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Discover() {
	const router = useRouter();
	const search = router.query.q || '';
	const inputRef = useRef<HTMLInputElement>(null);
	const [searchToggled, setSearchToggled] = useState(false);
	const { data, error } = useSWR<IMangaList>(
		`/api/manga?includes[]=cover_art&title=${search}`,
		fetcher
	);

	const goBack = () => {
		router.replace('/');
	};

	const toggleSearch = () => {
		setSearchToggled(!searchToggled);
		inputRef.current?.focus();
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
				{searchToggled ? (
					<form action="/discover" method="GET" className="w-full">
						<input
							type="text"
							placeholder="Search"
							name="q"
							className="bg-inherit w-full px-2 outline-none"
							autoComplete="off"
							ref={inputRef}
						/>
					</form>
				) : (
					<button onClick={toggleSearch}>
						<AiOutlineSearch size={24} />
					</button>
				)}
			</header>
			<main className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-5">
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
