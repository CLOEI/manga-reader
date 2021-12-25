import { Text } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

import Head from 'next/head';

function Manga({ data }) {
	const { attributes } = data.data[0];
	const title = attributes.title[Object.keys(attributes.title)[0]];
	console.log(data);

	return (
		<>
			<Head>
				<title>Manga-reader • {title}</title>
			</Head>
		</>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.params;
	try {
		const data = await axios(
			`https://api.mangadex.org/manga?includes[]=cover_art&ids[]=${id}`
		);
		return {
			props: {
				data: data.data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export default Manga;
