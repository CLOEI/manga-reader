import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Head from 'next/head';

import { getDoc, collection, db, doc } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import { setDoc } from 'firebase/firestore';

export default function Home() {
	const auth = useAuth();

	if (auth.user) {
		const userRef = doc(db, 'users', auth.user.uid);
	}

	return (
		<Layout>
			<Head>
				<title>Manga</title>
			</Head>
			<header className="bg-gray-800 h-12 flex items-center px-2 justify-between">
				<h1 className="font-bold text-xl">Library</h1>
				<AiOutlineSearch size={24} />
			</header>
			<main className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-5"></main>
			<Navbar />
		</Layout>
	);
}
