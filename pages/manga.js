import {
	Box,
	Text,
	Heading,
	IconButton,
	Icon,
	VStack,
	HStack,
	SkeletonText,
	Divider,
	scaleFadeConfig,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineHeart } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Error from 'next/error';

import useChapterData from '../hooks/useChapterData';
import ChapterCard from '../components/ChapterCard';

function Manga({ data }) {
	const router = useRouter();
	const query = router.query;
	const { data: chapterListData, total, error } = useChapterData(query.id);
	if (data.result === 'error' || error) {
		return <Error statusCode={404} />;
	}

	const { attributes, relationships, id } = data.data;
	const title = attributes.title[Object.keys(attributes.title)[0]];
	const description =
		attributes.description[Object.keys(attributes.description)[0]];
	const coverFileName = relationships.filter(
		(item) => item.type === 'cover_art'
	)[0].attributes.fileName;
	const artistName = relationships.filter((item) => item.type === 'artist')[0]
		.attributes.name;
	const tags = attributes.tags.map((tag) => tag.attributes.name.en);

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
				<Box pos="relative" w="160px" pb="245px" rounded="lg" overflow="hidden">
					<Image
						alt={title}
						src={`https://uploads.mangadex.org/covers/${id}/${coverFileName}`}
						layout="fill"
						priority
					/>
				</Box>
				<Box px="3">
					<Text fontWeight="semibold" textAlign="center">
						{title}
					</Text>
					<Text textAlign="center">{artistName}</Text>
				</Box>
			</VStack>
			<Box px="3">
				<Box>
					<Text noOfLines={6}>{description}</Text>
					<HStack overflow="auto" pb="4" mt="4">
						<Tag tags={tags} />
					</HStack>
				</Box>
				<HStack justifyContent="space-around" h="5rem" my="2.5">
					<Icon as={AiOutlineHeart} w="3rem" h="3rem" />
					<Divider orientation="vertical" bgColor="gray.100" />
					<VStack>
						<Text size="sm" fontWeight="semibold">
							Chapter
						</Text>
						<Text>{total}</Text>
					</VStack>
				</HStack>
				<Box>
					<SkeletonText noOfLines={4} spacing="3.5" isLoaded={!!chapterListData}>
						{chapterListData &&
							[]
								.concat(...chapterListData.map((item) => item.data))
								.sort((a, b) => {
									const first = parseInt(a.attributes.chapter, 10) || 0;
									const sec = parseInt(b.attributes.chapter, 10) || 0;

									return sec - first;
								})
								.map(({ attributes, relationships }, i) => {
									const title = attributes.title;
									const volume = attributes.volume;
									const chapter = attributes.chapter;

									return (
										<ChapterCard
											key={i}
											title={title}
											volume={volume}
											chapter={chapter}
										/>
									);
								})}
					</SkeletonText>
				</Box>
			</Box>
		</Box>
	);
}

const Tag = ({ tags }) => {
	return (
		<>
			{tags.map((tag, i) => {
				return (
					<Box
						key={i}
						whiteSpace="nowrap"
						bgColor="gray.100"
						p="2"
						borderRadius="12px"
					>
						<Text>{tag}</Text>
					</Box>
				);
			})}
		</>
	);
};

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
