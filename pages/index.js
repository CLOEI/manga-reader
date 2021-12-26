import {
	Box,
	Text,
	HStack,
	VStack,
	Avatar,
	IconButton,
	Icon,
	Button,
	Heading,
	Skeleton,
	SkeletonText,
	Modal,
	ModalOverlay,
	ModalContent,
	useDisclosure,
	InputGroup,
	InputLeftElement,
	Input,
	SimpleGrid,
} from '@chakra-ui/react';
import {
	AiOutlineAppstore,
	AiOutlineHome,
	AiOutlineBook,
	AiOutlineDash,
	AiOutlineArrowRight,
} from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

import { useRouter } from 'next/router';
import Head from 'next/head';

import MangaCard from '../components/MangaCard';
import MangaCard2 from '../components/MangaCard2';

export default function Home({ creatorChoices, discoverData }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<Box mx="4" mb="100px">
			<HStack justifyContent="space-between" mt="3" mb="6">
				<Heading as="h1" size="2xl">
					Home
				</Heading>
				<IconButton
					icon={<Icon as={AiOutlineAppstore} w="30px" h="30px" />}
					variant="outline"
				/>
			</HStack>
			<Button
				leftIcon={<Icon as={FiSearch} w="25px" h="25px" color="gray.400" />}
				w="100%"
				justifyContent="flex-start"
				h="60px"
				onClick={onOpen}
			>
				<Text color="gray.400">Mieruko-chan...</Text>
			</Button>
			{/** Creator choice */}
			<Box mt="6">
				<Heading as="h2" size="lg" mb="4">
					Creator choices
				</Heading>
				<HStack overflowX="auto" pb="4">
					{creatorChoices.map(({ attributes, relationships, id }, i) => {
						const title = attributes.title[Object.keys(attributes.title)[0]];
						const coverFileName = relationships.filter(
							(item) => item.type === 'cover_art'
						)[0].attributes.fileName;
						const artistName = relationships.filter(
							(item) => item.type === 'artist'
						)[0].attributes.name;

						return (
							<MangaCard
								title={title}
								mangaID={id}
								coverFileName={coverFileName}
								artistName={artistName}
								key={i}
							/>
						);
					})}
				</HStack>
			</Box>
			{/** Discover */}
			<Box mt="5" mb="4">
				<Heading as="h2" size="lg" mb="4">
					Discover
				</Heading>
				<Box>
					{discoverData.map(({ attributes, relationships, id }, i) => {
						const title = attributes.title[Object.keys(attributes.title)[0]];
						const description =
							attributes.description[Object.keys(attributes.description)[0]];
						const coverFileName = relationships.filter(
							(item) => item.type === 'cover_art'
						)[0].attributes.fileName;

						return (
							<MangaCard2
								title={title}
								description={description}
								mangaID={id}
								coverFileName={coverFileName}
								key={i}
							/>
						);
					})}
				</Box>
				<Box ml="auto" w="max-content">
					<Button
						rightIcon={<Icon as={AiOutlineArrowRight} w="25px" h="25px" />}
						onClick={() => router.push('/discover?p=1')}
					>
						Discover more
					</Button>
				</Box>
			</Box>
			{/** Bottom Navbar */}
			<SimpleGrid
				pos="fixed"
				bottom="0"
				left="0"
				w="100%"
				h="70px"
				bgColor="gray.200"
				borderRadius="15px 15px 0 0"
				columns={3}
				zIndex={999}
			>
				<IconButton
					icon={<Icon as={AiOutlineHome} color="black" w="20px" h="20px" />}
					variant="link"
					borderTopLeftRadius="15px"
				/>
				<IconButton
					icon={<Icon as={AiOutlineBook} color="black" w="20px" h="20px" />}
					variant="link"
				/>
				<IconButton
					icon={<Icon as={AiOutlineDash} color="black" w="20px" h="20px" />}
					variant="link"
					borderTopRightRadius="15px"
				/>
			</SimpleGrid>
			{/** Modal for search */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<InputGroup>
						<InputLeftElement h="64px">
							<Icon as={FiSearch} w="20px" h="20px" />
						</InputLeftElement>
						<Input type="text" h="64px" />
					</InputGroup>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export async function getServerSideProps() {
	const creator = await fetch(
		'https://api.mangadex.org/manga?ids[]=a96676e5-8ae2-425e-b549-7f15dd34a6d8&ids[]=9e03b2ca-5191-44a6-88b6-c0cd49d06b51&ids[]=a77742b1-befd-49a4-bff5-1ad4e6b0ef7b&ids[]=7f952b22-812d-4252-88e1-a99818f13acd&ids[]=cfc3d743-bd89-48e2-991f-63e680cc4edf&ids[]=d7037b2a-874a-4360-8a7b-07f2899152fd&ids[]=829fc3a7-d4f4-42e9-9032-0917083f9e0d&ids[]=b49fd121-19bf-4344-a8e1-d1be7ca04e08&includes[]=artist&includes[]=cover_art'
	);
	const creatorChoices = await creator.json();
	const discover = await fetch(
		'https://api.mangadex.org/manga?includes[]=artist&includes[]=cover_art&limit=8'
	);
	const discoverData = await discover.json();

	return {
		props: {
			creatorChoices: creatorChoices.data,
			discoverData: discoverData.data,
		},
	};
}
