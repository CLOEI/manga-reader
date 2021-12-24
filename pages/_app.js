import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

export const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
