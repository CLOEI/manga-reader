import { Box, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Image from 'next/image';

function MangaCard({ coverFileName, mangaID, title }) {
	return (
		<Card>
			<Image
				alt={title}
				layout="fill"
				objectFit="cover"
				src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`}
			/>
			<Heading
				as="h2"
				size="sm"
				pos="absolute"
				bottom="2"
				px="2px"
				zIndex="2"
				cursor="text"
			>
				{title}
			</Heading>
		</Card>
	);
}

const Card = styled.div`
	position: relative;
	width: 100%;
	padding-bottom: 140%;
	cursor: pointer;
	border-radius: 4px;
	overflow: hidden;
	span {
		opacity: 0.95 !important;
	}
	&::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
	}
`;

export default MangaCard;
