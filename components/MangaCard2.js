import { Box, VStack, SimpleGrid, Heading, Text } from '@chakra-ui/react';

import Image from 'next/image';

function MangaCard2({ coverFileName, mangaID, title, description }) {
	return (
		<SimpleGrid
			columns={4}
			h="226px"
			overflowY="hidden"
			mb="4"
			bgColor="gray.100"
			rounded="md"
			overflow="hidden"
		>
			<Box pos="relative">
				<Image
					alt={title}
					src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`}
					layout="fill"
					objectFit="cover"
				/>
			</Box>
			<VStack gridColumn="span 3" alignItems="flex-start" p="2">
				<Heading as="h3" size="md" noOfLines={2}>
					{title}
				</Heading>
				<Text noOfLines={6} wordBreak="break-word">
					{description}
				</Text>
			</VStack>
		</SimpleGrid>
	);
}

export default MangaCard2;
