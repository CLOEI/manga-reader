import {
	SimpleGrid,
	IconButton,
	Icon,
	useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineBook, AiOutlineDash } from 'react-icons/ai';

import { useRouter } from 'next/router';

function Navbar() {
	const router = useRouter();
	const bg = useColorModeValue('gray.200', 'gray.700');

	return (
		<SimpleGrid
			pos="fixed"
			bottom="0"
			left="0"
			w="100%"
			h="70px"
			bgColor={bg}
			borderRadius="15px 15px 0 0"
			columns={3}
			zIndex={999}
		>
			<IconButton
				icon={<Icon as={AiOutlineHome} w="20px" h="20px" />}
				variant="link"
				borderTopLeftRadius="15px"
				onClick={() => router.replace('/')}
			/>
			<IconButton
				icon={<Icon as={AiOutlineBook} w="20px" h="20px" />}
				variant="link"
				onClick={() => router.replace('/library')}
			/>
			<IconButton
				icon={<Icon as={AiOutlineDash} w="20px" h="20px" />}
				variant="link"
				borderTopRightRadius="15px"
			/>
		</SimpleGrid>
	);
}

export default Navbar;
