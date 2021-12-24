import {
	SimpleGrid,
	Heading,
	Text,
	HStack,
	Button,
	Kbd,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	InputGroup,
	InputLeftElement,
	Input,
	Icon,
	IconButton,
	Spinner,
	Box,
} from '@chakra-ui/react';
import {
	FiSearch,
	FiFilter,
	FiBook,
	FiCompass,
	FiMoreHorizontal,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';
import axios from 'axios';
import useSWR from 'swr';

import Link from 'next/link';
import Head from 'next/head';

import MangaCard from '../components/MangaCard';

const fetcher = (url) => axios(url).then((res) => res.data);

function Manga({ offset = 0 }) {
	const { data: list, error } = useSWR(
		`/api/manga?includes[]=cover_art&offset=${offset}`,
		fetcher
	);

	return (
		<>
			{list &&
				list.data.map(({ attributes, relationships, id }) => {
					const title = attributes.title[Object.keys(attributes.title)[0]];
					const coverArt = relationships.filter(
						(item) => item.type === 'cover_art'
					)[0];
					const coverFileName = coverArt.attributes.fileName;

					return (
						<MangaCard
							mangaID={id}
							coverFileName={coverFileName}
							title={title}
							key={id}
						/>
					);
				})}
		</>
	);
}

function Discover() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { ref, inView } = useInView({
		threshold: 0.2,
	});
	const [offset, setOffset] = useState(0);
	const mangas = [];

	for (let x = 0; x <= offset; x++) {
		mangas.push(<Manga offset={x * 10} key={x} />);
	}

	useEffect(() => {
		const triggerSearch = (e) => {
			if (e.ctrlKey && e.keyCode === 75) {
				e.preventDefault();
				onOpen();
			}
		};
		document.addEventListener('keydown', triggerSearch);

		return () => {
			document.removeEventListener('keydown', triggerSearch);
		};
	}, [onOpen]);

	useEffect(() => {
		if (inView) {
			setOffset((state) => state + 1);
		}
	}, [inView]);

	return (
		<>
			<Head>
				<title>Manga-reader</title>
			</Head>
			<HStack px="24px" py="12px" spacing="24px" h="70px">
				<Heading size="lg">Discover</Heading>
				<HStack flexGrow={1} justifyContent={['flex-end', 'space-between']}>
					<Button
						w="50%"
						leftIcon={<FiSearch />}
						justifyContent="flex-start"
						display={['none', 'flex']}
						onClick={() => onOpen()}
					>
						<HStack flexGrow={1} justifyContent="space-between">
							<Text color="gray.600">Mieruko-chan...</Text>
							<HStack spacing="0">
								<Kbd>Ctrl</Kbd>
								<Kbd>K</Kbd>
							</HStack>
						</HStack>
					</Button>
					<SIcon
						as={FiSearch}
						display={['initial', 'none']}
						onClick={() => onOpen()}
					/>
					<SIcon as={FiFilter} />
				</HStack>
			</HStack>
			<SimpleGrid
				columns={[2, null]}
				minChildWidth="160px"
				justifyItems="center"
				spacing="5px"
				maxH="calc(100vh - 70px - 54px)"
				overflowY="auto"
			>
				{mangas}
				<Box gridColumn="1/-1" py="10px">
					<Spinner ref={ref} height="24px" />
				</Box>
			</SimpleGrid>
			<SimpleGrid
				columns="3"
				w="90%"
				pos="fixed"
				bottom="2"
				left="50%"
				transform="translateX(-50%)"
				rounded="sm"
				overflow="hidden"
				zIndex={999}
			>
				<Link href="/">
					<a>
						<IconButton icon={<FiBook />} rounded="none" w="100%" />
					</a>
				</Link>
				<Link href="/discover">
					<a>
						<IconButton icon={<FiCompass />} rounded="none" w="100%" />
					</a>
				</Link>
				<Link href="/">
					<a>
						<IconButton icon={<FiMoreHorizontal />} rounded="none" w="100%" />
					</a>
				</Link>
			</SimpleGrid>
			{/* Search modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<InputGroup h="64px">
						<InputLeftElement h="64px">
							<FiSearch />
						</InputLeftElement>
						<Input variant="unstyled" placeholder="Mieruko-chan..." />
					</InputGroup>
				</ModalContent>
			</Modal>
		</>
	);
}

const SIcon = styled(Icon)`
	width: 25px;
	height: 25px;
	cursor: pointer;
`;

export default Discover;
