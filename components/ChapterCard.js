import { Box, Text, useColorModeValue } from '@chakra-ui/react';

function ChapterCard({ volume, chapter, title }) {
	const bg = useColorModeValue('gray.100', 'gray.700');

	return (
		<Box py="3.5" bgColor={bg} mb="1" cursor="pointer">
			<Text noOfLines={1} fontWeight="semibold" pl="1.5">
				{volume
					? title
						? `Vol.${volume} Ch.${chapter || 0} - ${title}`
						: `Vol.${volume} Ch.${chapter}`
					: title
					? `Ch.${chapter || 0} - ${title}`
					: `Ch.${chapter}`}
			</Text>
		</Box>
	);
}

export default ChapterCard;
