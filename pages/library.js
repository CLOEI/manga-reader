import {
	Box,
	Heading,
	HStack,
	IconButton,
	Icon,
	useDisclosure,
	Button,
	Text,
	Avatar,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	useColorMode,
	SimpleGrid,
} from '@chakra-ui/react';
import {
	AiOutlineAppstore,
	AiOutlineLogout,
	AiOutlineBook,
	AiOutlineCompass,
} from 'react-icons/ai';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { db, doc, getDoc } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import MangaCard from '../components/MangaCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Library() {
	const auth = useAuth();
	const [query, setQuery] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	useEffect(() => {
		const data = async () => {
			if (auth.user) {
				const docRef = doc(db, 'users', auth.user.uid);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data()?.library || [];

				const query = data
					.map((id, i) => {
						return i === 0 ? `?ids[]=${id}` : `&ids[]=${id}`;
					})
					.join('');

				setQuery(query);
			}
		};

		data();
	}, [auth.user]);

	return (
		<Box mx="4" mb="100px">
			<HStack justifyContent="space-between" mt="3" mb="6">
				<Heading as="h1" size="2xl">
					Library
				</Heading>
				<IconButton
					icon={<Icon as={AiOutlineAppstore} w="30px" h="30px" />}
					variant="outline"
					onClick={onOpen}
				/>
			</HStack>
			<SimpleGrid columns={2} spacingY="2.5" justifyItems="center">
				{query.length > 1 && <Manga query={query} />}
			</SimpleGrid>
			{/** Bottom Navbar */}
			<Navbar />
			{/** Modal for menu */}
			<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
				<ModalOverlay />
				<ModalContent>
					<ModalBody pb="4">
						<HStack my="4">
							<Avatar src={auth.user?.photoURL} />
							{auth.user ? (
								<HStack justifyContent="space-between" w="100%">
									<Text fontWeight="semibold" fontSize="xl">
										{auth.user.displayName}
									</Text>
									<Button
										leftIcon={<Icon as={AiOutlineLogout} />}
										onClick={() => auth.signout()}
									>
										Logout
									</Button>
								</HStack>
							) : (
								<Button leftIcon={<Icon as={FiGithub} />} onClick={() => auth.signin()}>
									Login with GitHub
								</Button>
							)}
						</HStack>
						<Button
							leftIcon={<Icon as={AiOutlineBook} />}
							w="100%"
							justifyContent="flex-start"
							mb="1"
							h="50px"
							onClick={() => router.push('/library')}
							variant="ghost"
						>
							Library
						</Button>
						<Button
							leftIcon={<Icon as={AiOutlineCompass} />}
							w="100%"
							justifyContent="flex-start"
							mb="1"
							h="50px"
							onClick={() => router.push('/discover?p=1')}
							variant="ghost"
						>
							Discover
						</Button>
						<Button
							leftIcon={
								colorMode === 'dark' ? <Icon as={FiSun} /> : <Icon as={FiMoon} />
							}
							w="100%"
							justifyContent="flex-start"
							mb="1"
							h="50px"
							onClick={() => toggleColorMode()}
							variant="ghost"
						>
							{colorMode === 'dark' ? 'Light' : 'Dark'} mode
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
}

function Manga({ query }) {
	const { data: list, error } = useSWR(
		`/api/manga${query}&includes[]=artist&includes[]=cover_art`,
		fetcher
	);

	return (
		<>
			{list &&
				list.data.map(({ attributes, relationships, id }, i) => {
					const title = attributes.title[Object.keys(attributes.title)[0]];
					const coverArt = relationships.filter(
						(item) => item.type === 'cover_art'
					)[0];
					const coverFileName = coverArt.attributes.fileName;
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
		</>
	);
}

export default Library;
