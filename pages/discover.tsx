import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';

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
	const [ref, inView] = useInView({
		triggerOnce: true,
	});
	const { data, setSize, size } = useSWRInfinite((index, previousPageData) => {
		if (previousPageData && !previousPageData?.data) return null;
		return `/api/manga?includes[]=cover_art&title=${search}&offset=${
			index * 20
		}&limit=20`;
	}, fetcher);

	useEffect(() => {
		if (inView) {
			setSize(size + 1);
		}
	}, [inView]);

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
					data.map((mangaList) => {
						return mangaList.data.map((data: any, i: number) => {
							const manga = new Manga(data);
							if (i === 19) {
								return <MangaCard key={manga.id} manga={manga} ref={ref} />;
							}
							return <MangaCard key={manga.id} manga={manga} />;
						});
					})}
			</main>
		</Layout>
	);
}

export default Discover;
