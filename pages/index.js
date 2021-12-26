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
} from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import styled from '@emotion/styled';

import Head from 'next/head';
import MangaCard from '../components/MangaCard';

export default function Home({ creatorChoices }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	console.log(creatorChoices);

	return (
		<Box mx="4">
			<HStack justifyContent="space-between" mt="3" mb="6">
				<Heading as="h1" size="3xl">
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
			<Box mt="6" mb="4">
				<Heading as="h2" size="lg">
					Creator choices
				</Heading>
			</Box>
			{/** Creator choice grid */}
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
	const res = await fetch(
		'https://api.mangadex.org/manga?ids[]=a96676e5-8ae2-425e-b549-7f15dd34a6d8&ids[]=9e03b2ca-5191-44a6-88b6-c0cd49d06b51&ids[]=a77742b1-befd-49a4-bff5-1ad4e6b0ef7b&ids[]=7f952b22-812d-4252-88e1-a99818f13acd&ids[]=cfc3d743-bd89-48e2-991f-63e680cc4edf&ids[]=d7037b2a-874a-4360-8a7b-07f2899152fd&ids[]=829fc3a7-d4f4-42e9-9032-0917083f9e0d&ids[]=b49fd121-19bf-4344-a8e1-d1be7ca04e08&includes[]=artist&includes[]=cover_art'
	);
	const data = await res.json();

	return {
		props: {
			creatorChoices: data.data,
		},
	};
}
