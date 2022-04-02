import useSWR from 'swr';

import Head from 'next/head';

import useLocalStorage from '../utils/useLocalStorage';
import Navbar from '../components/Navbar';
import Emoji from '../components/Emoji';
import Manga from '../components/Manga';

export default function Home() {
	const [data] = useLocalStorage('library', []);
	const {
		data: mangaList,
		error,
		isValidating,
	} = useSWR(
		data.length > 0
			? `/api/manga?${
					'ids[]=' + data.join('&ids[]=')
			  }&limit=100&includes[]=cover_art`
			: null
	);

	if (error) {
		console.log(error);
	}

	return (
		<div>
			<Head>
				<title>Library</title>
			</Head>
			<header className="flex h-12 items-center px-2">
				<h1 className="text-white text-2xl font-bold">Library</h1>
			</header>
			<main className="relative grid grid-cols-2 gap-1 px-2 mt-2 mb-20 md:grid-cols-4 lg:grid-cols-5">
				{mangaList &&
					mangaList.data.map(({ attributes, id, relationships }) => {
						const availableLang = attributes.availableTranslatedLanguages;
						const titleObj = attributes.title;
						const fileName = relationships.filter(
							(item) => item.type === 'cover_art'
						)[0].attributes.fileName;

						return (
							<Manga manga={{ availableLang, titleObj, id, fileName }} key={id} />
						);
					})}
			</main>
			{isValidating && <Emoji text="Loading..." />}
			{!(data.length > 0) && <Emoji type="err" text="No data" />}
			<Navbar />
		</div>
	);
}
