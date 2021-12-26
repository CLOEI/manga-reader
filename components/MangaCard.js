import { Box, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Image from 'next/image';
import Link from 'next/link';

function MangaCard({ coverFileName, artistName, mangaID, title }) {
	return (
		<Box flexShrink={0} maxW="160px" cursor="pointer">
			<Box pos="relative" w="160px" pb="145%" rounded="lg" overflow="hidden">
				<Image
					alt={title}
					src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`}
					layout="fill"
				/>
			</Box>
			<Box>
				<Heading as="h3" size="sm" isTruncated>
					{title}
				</Heading>
				<Text isTruncated>{artistName}</Text>
			</Box>
		</Box>
	);
}

export default MangaCard;
