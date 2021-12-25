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
} from '@chakra-ui/react';
import {
	FiSearch,
	FiFilter,
	FiBook,
	FiCompass,
	FiMoreHorizontal,
} from 'react-icons/fi';
import { useEffect } from 'react';
import styled from '@emotion/styled';

import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	return (
		<>
			<Head>
				<title>Manga-reader</title>
			</Head>
			<HStack px="24px" py="12px" spacing="24px" h="70px">
				<Heading size="lg">Library</Heading>
				<HStack
					flexGrow={1}
					justifyContent={['flex-end', 'space-between']}
					spacing="4"
				>
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
			<SimpleGrid columns={[2, null]} minChildWidth="160px"></SimpleGrid>
			<SimpleGrid
				columns="3"
				w="90%"
				pos="fixed"
				bottom="2"
				left="50%"
				transform="translateX(-50%)"
				rounded="sm"
				overflow="hidden"
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
