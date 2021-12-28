import {
	Box,
	Text,
	Heading,
	IconButton,
	Icon,
	VStack,
	HStack,
	SkeletonText,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useSWRInfinite from 'swr/infinite';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Error from 'next/error';

function Manga({ data }) {
	const router = useRouter();
	const query = router.query;
	const chapterListData = useChapterData(query.id);
	if (data.result === 'error') {
		return <Error statusCode={404} />;
	}

	console.log(chapterListData);

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
				<Box pos="relative" w="160px" pb="65%" rounded="lg" overflow="hidden">
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
				<Text noOfLines={6}>{description}</Text>
				<HStack overflow="auto" pb="4" mt="4">
					<Tag tags={tags} />
				</HStack>
			</Box>
			<Box px="3" pt="2">
				<Box>
					<SkeletonText noOfLines={2} />
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

const fetcher = (offset, id) =>
	fetch(
		`/api/chapter?manga=${id}&offset=${
			offset * 100
		}&limit=100&translatedLanguage[]=en`
	).then((res) => res.json());

const useChapterData = (id) => {
	const { data, size, setSize } = useSWRInfinite((offset, previousData) => {
		if (previousData && !previousData.data) return null;

		return [offset, id];
	}, fetcher);

	if (!data) return null;
	const total = data[0].total;
	const currTotal = data.reduce((pre, curr) => {
		return pre + curr.data.length;
	}, 0);

	if (parseInt(total, 10) > currTotal) {
		setSize(size + 1);
	}
	if (currTotal === parseInt(total, 10)) {
		return data;
	}

	return null;
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
