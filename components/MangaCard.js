import { Box, Heading, Text } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';

function MangaCard({ coverFileName, artistName, mangaID, title }) {
	return (
		<Link href={`/manga?id=${mangaID}`} passHref>
			<Box flexShrink={0} maxW="160px" cursor="pointer" as="a">
				<Box pos="relative" w="160px" pb="145%" rounded="lg" overflow="hidden">
					<Image
						alt={title}
						src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`}
						layout="fill"
					/>
				</Box>
				<Box mt="2">
					<Heading as="h3" size="sm" isTruncated>
						{title}
					</Heading>
					<Text isTruncated>{artistName}</Text>
				</Box>
			</Box>
		</Link>
	);
}

export default MangaCard;
