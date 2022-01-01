import {
	Box,
	Heading,
	HStack,
	IconButton,
	Icon,
	useDisclosure,
	SimpleGrid,
} from '@chakra-ui/react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { db, doc, getDoc } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import MangaCard from '../components/MangaCard';
import MenuModal from '../components/MenuModal';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Library() {
	const auth = useAuth();
	const [query, setQuery] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

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
			<MenuModal isOpen={isOpen} onClose={onClose} />
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
