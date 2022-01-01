import {
	Modal,
	ModalOverlay,
	ModalContent,
	HStack,
	Button,
	Text,
	Avatar,
	ModalBody,
	Icon,
	useColorMode,
} from '@chakra-ui/react';
import {
	AiOutlineBook,
	AiOutlineLogout,
	AiOutlineCompass,
} from 'react-icons/ai';
import { FiGithub, FiMoon, FiSun } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';

function MenuModal({ isOpen, onClose }) {
	const auth = useAuth();
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	console.log(auth.user);

	return (
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
	);
}

export default MenuModal;
