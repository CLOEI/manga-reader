import { Box, Text, HStack } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';

import useChapterData from '../hooks/useChapterData';

function MangaCard3({ coverFileName, mangaID, title }) {
	const { total } = useChapterData(mangaID, true);

	return (
		<Link href={`/manga?id=${mangaID}`} passHref>
			<Box
				w="100%"
				pb="60%"
				rounded="lg"
				overflow="hidden"
				cursor="pointer"
				pos="relative"
				mb="3"
				boxShadow="inner"
				as="a"
				display="block"
			>
				<Image
					alt={title}
					src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
				/>
				<HStack
					pos="absolute"
					bottom="0"
					bgColor="rgba(0, 0, 0, 55%)"
					justifyContent="space-between"
					w="100%"
					px="2"
					color="gray.100"
				>
					<Text fontWeight="bold" fontSize="xl" noOfLines={1}>
						{title}
					</Text>
					<Text color="yellow.300">{total}</Text>
				</HStack>
			</Box>
		</Link>
	);
}

export default MangaCard3;
