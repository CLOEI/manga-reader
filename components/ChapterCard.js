import { Box, Text } from '@chakra-ui/react';

function ChapterCard({ volume, chapter, title }) {
	return (
		<Box py="3.5" bgColor="gray.100" mb="1" cursor="pointer">
			<Text noOfLines={1} fontWeight="semibold">
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
