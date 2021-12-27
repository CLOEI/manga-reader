import { Box, Text, Heading, IconButton, Icon, VStack } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Error from 'next/error';

function Manga({ data }) {
	const router = useRouter();
	console.log(data);
	if (data.result === 'error') {
		return <Error statusCode={404} />;
	}
	const { attributes, relationships, id } = data.data;
	const title = attributes.title[Object.keys(attributes.title)[0]];
	const coverFileName = relationships.filter(
		(item) => item.type === 'cover_art'
	)[0].attributes.fileName;
	const artistName = relationships.filter((item) => item.type === 'artist')[0]
		.attributes.name;

	return (
		<Box>
			<Box pos="relative" h="60px">
				<IconButton
					icon={<Icon as={AiOutlineArrowLeft} w="25px" h="25px" />}
					variant="outline"
					pos="absolute"
					left="10px"
					top="50%"
					transform="translateY(-50%)"
					onClick={() => router.replace('/')}
				/>
				<Heading
					textAlign="center"
					size="md"
					lineHeight="60px"
					fontWeight="semibold"
				>
					Manga Detail
				</Heading>
			</Box>
			<VStack my="4">
				<Box pos="relative" w="160px" pb="65%" rounded="lg" overflow="hidden">
					<Image
						alt={title}
						src={`https://uploads.mangadex.org/covers/${id}/${coverFileName}`}
						layout="fill"
					/>
				</Box>
				<Box>
					<Text fontWeight="semibold">{title}</Text>
					<Text textAlign="center">{artistName}</Text>
				</Box>
			</VStack>
		</Box>
	);
}

export async function getServerSideProps(ctx) {
	const query = ctx.query;
	const res = await fetch(
		`https://api.mangadex.org/manga/${query.id}?includes[]=artist&includes[]=cover_art`
	);
	const data = await res.json();

	return {
		props: {
			data: data,
		},
	};
}

export default Manga;
