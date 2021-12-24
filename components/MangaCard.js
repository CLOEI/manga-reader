import { Box, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Image from 'next/image';
import Link from 'next/link';

function MangaCard({ coverFileName, mangaID, title }) {
	return (
		<Link href={`/manga/${mangaID}`} passHref>
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
		</Link>
	);
}

const Card = styled.a`
	position: relative;
	display: block;
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
