import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
	const fetchData = async () => {
		const data = await axios('/api/manga');
		console.log(data);
	};

	return <button onClick={fetchData}>Fetch</button>;
}
