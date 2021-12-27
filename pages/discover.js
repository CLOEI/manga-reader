import {
	Heading,
	Box,
	HStack,
	IconButton,
	Icon,
	Button,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Error from 'next/error';

import MangaCard2 from '../components/MangaCard2';

function Discover({ data }) {
	const router = useRouter();
	const { p } = router.query;

	if (data.result === 'error') {
		return <Error statusCode={404} />;
	}

	return (
		<Box mx="4" mb="70px">
			<HStack mt="3" mb="6">
				<IconButton
					icon={<Icon as={AiOutlineArrowLeft} w="25px" h="25px" />}
					onClick={() => router.replace('/')}
				/>
				<Heading as="h1" size="2xl">
					Discover
				</Heading>
			</HStack>
			<Box mb="4">
				<Heading as="h2" size="lg" mb="4">
					Page {p}
				</Heading>
				<Box>
					{data.data.map(({ attributes, relationships, id }, i) => {
						const title = attributes.title[Object.keys(attributes.title)[0]];
						const description =
							attributes.description[Object.keys(attributes.description)[0]];
						const coverFileName = relationships.filter(
							(item) => item.type === 'cover_art'
						)[0].attributes.fileName;

						return (
							<MangaCard2
								title={title}
								description={description}
								mangaID={id}
								coverFileName={coverFileName}
								key={i}
							/>
						);
					})}
				</Box>
			</Box>
			<HStack justifyContent="space-between">
				<Button
					leftIcon={<Icon as={AiOutlineArrowLeft} w="25px" h="25px" />}
					onClick={() =>
						router.push(`${p === '1' ? '/' : `/discover?p=${parseInt(p, 10) - 1}`}`)
					}
				>
					Previous
				</Button>
				<Button
					rightIcon={<Icon as={AiOutlineArrowRight} w="25px" h="25px" />}
					onClick={() => router.push(`/discover?p=${parseInt(p, 10) + 1}`)}
				>
					Next
				</Button>
			</HStack>
		</Box>
	);
}

export async function getServerSideProps(ctx) {
	const query = ctx.query;
	const res = await fetch(
		`https://api.mangadex.org/manga?includes[]=artist&includes[]=cover_art&offset=${
			(query.p - 1) * 10
		}`
	);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}

export default Discover;
