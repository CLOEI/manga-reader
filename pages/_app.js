import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider
			enableColorScheme={false}
			attribute="class"
			defaultTheme="dark"
		>
			<SWRConfig
				value={{
					fetcher: (resource, init) =>
						fetch(resource, init).then((res) => res.json()),
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</ThemeProvider>
	);
}

export default MyApp;
