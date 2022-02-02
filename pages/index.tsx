import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useSWR from 'swr';

import Head from 'next/head';

import { getDoc, db, doc } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import MangaCard from '../components/MangaCard';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Manga from '../utils/Manga';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
	const [IDS, setIDS] = useState<string | false>(false);
	const auth = useAuth();
	const { data } = useSWR(
		IDS ? `/api/manga?${IDS}&includes[]=cover_art` : null,
		fetcher
	);

	useEffect(() => {
		if (auth.user) {
			const userRef = doc(db, 'users', auth.user.uid);
			getDoc(userRef).then((user) => {
				if (user.exists()) {
					const library = user.data().library;
					const query = 'ids[]=' + library.join('&ids[]=');
					setIDS(query);
				}
			});
		}
	}, [auth.user]);

	return (
		<Layout>
			<Head>
				<title>Manga</title>
			</Head>
			<header className="bg-gray-800 h-12 flex items-center px-2 justify-between">
				<h1 className="font-bold text-xl">Library</h1>
				<AiOutlineSearch size={24} />
			</header>
			<main className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-5">
				{data?.data?.map((data: any) => {
					const manga = new Manga(data);
					return <MangaCard key={manga.id} manga={manga} />;
				})}
			</main>
			<Navbar />
		</Layout>
	);
}
