import { AiOutlineSearch } from 'react-icons/ai';

import Head from 'next/head';

import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Manga</title>
			</Head>
			<header className="bg-gray-800 h-12 flex items-center px-2 justify-between">
				<h1 className="font-bold text-xl">Library</h1>
				<AiOutlineSearch size={24} />
			</header>
			<main className=""></main>
			<Navbar />
		</Layout>
	);
}
