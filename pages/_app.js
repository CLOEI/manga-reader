import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	styles: {
		global: {
			'::-webkit-scrollbar': {
				width: '8px',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: 'gray.700',
				border: '3px solid gray.800',
			},
		},
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
