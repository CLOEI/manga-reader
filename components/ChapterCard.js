import { Box, Text } from '@chakra-ui/react';

function ChapterCard({ volume, chapter, title, scanlation, date }) {
	return (
		<Box>
			<Text>
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
