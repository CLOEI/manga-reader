import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ProvideAuth } from '../hooks/useAuth';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<ProvideAuth>
				<Component {...pageProps} />
			</ProvideAuth>
		</ChakraProvider>
	);
}

export default MyApp;
