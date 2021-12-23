import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
	const fetchData = async () => {
		const data = await axios('https://api.mangadex.org/manga');
		console.log(data);
	};

	return <button onClick={fetchData}>Fetch</button>;
}
