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
	useColorModeValue,
} from '@chakra-ui/react';
import {
	AiOutlineArrowLeft,
	AiOutlineHeart,
	AiFillHeart,
} from 'react-icons/ai';
import { useEffect, useState, useCallback } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Error from 'next/error';
import Head from 'next/head';

import { db, getDoc, doc, setDoc } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import useChapterData from '../hooks/useChapterData';
import ChapterCard from '../components/ChapterCard';

function debounce(func, delay) {
	let timer = null;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

function Manga({ data }) {
	const [inLibrary, setInLibrary] = useState(false);
	const [allow, setAllow] = useState(false); // allow updating/modifying db
	const router = useRouter();
	const auth = useAuth();
	const query = router.query;
	const { data: chapterListData, total, error } = useChapterData(query.id);

	useEffect(() => {
		const data = async () => {
			if (auth.user) {
				const docRef = doc(db, 'users', auth.user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const library = docSnap.data().library;
					if (library.includes(query.id)) setInLibrary(true);
				} else {
					await setDoc(docRef, {
						library: [],
					});
				}
				setAllow(true);
			}
		};
		data();
	}, [auth.user, query.id]);

	useEffect(() => {
		const data = async () => {
			if (auth.user && allow) {
				const docRef = doc(db, 'users', auth.user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const library = docSnap.data().library;

					if (inLibrary) {
						if (library.includes(query.id)) return;
						await setDoc(docRef, {
							library: [...library, query.id],
						});
					} else {
						const newLibrary = library.filter((item) => item !== query.id);
						await setDoc(docRef, {
							library: newLibrary,
						});
					}
				}
			}
		};
		data();
	}, [inLibrary, auth.user, query.id, allow]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const addToLibrary = useCallback(
		debounce((e) => {
			setInLibrary((state) => !state);
		}, 250),
		[]
	);

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
		?.attributes.name;
	const tags = attributes.tags.map((tag) => tag.attributes.name.en);

	return (
		<Box>
			<Head>
				<title>{title}</title>
			</Head>
			<Box pos="relative" h="60px">
				<IconButton
					icon={<Icon as={AiOutlineArrowLeft} w="25px" h="25px" />}
					variant="outline"
					pos="absolute"
					left="10px"
					top="50%"
					transform="translateY(-50%)"
					onClick={() => router.back()}
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
					<Icon
						as={inLibrary ? AiFillHeart : AiOutlineHeart}
						w="3rem"
						h="3rem"
						cursor="pointer"
						onClick={addToLibrary}
					/>
					<Divider orientation="vertical" />
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
									const first = parseFloat(a.attributes.chapter, 10) || 0;
									const sec = parseFloat(b.attributes.chapter, 10) || 0;

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
	const bg = useColorModeValue('gray.100', 'gray.700');

	return (
		<>
			{tags.map((tag, i) => {
				return (
					<Box key={i} whiteSpace="nowrap" bgColor={bg} p="2" borderRadius="12px">
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
