import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Head from 'next/head';

import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Emoji from '../components/Emoji';
import Manga from '../components/Manga';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			<header className="flex bg-dark-01dp h-12 items-center px-2">
				<h1 className="text-white text-2xl font-bold">Home</h1>
			</header>
			<main className="relative grid grid-cols-2 gap-1 px-2 my-2 flex-grow">
				{isLoading ? <Emoji text="Loading..." /> : null}
			</main>
			<Navbar />
		</Container>
	);
}
