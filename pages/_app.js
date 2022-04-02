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
						fetch(resource, init).then((res) => {
							if (!res.ok) {
								const error = new Error("There's something wrong while fetching data");
								error.info = res.json();
								error.status = res.status;
								throw error;
							}
							return res.json();
						}),
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</ThemeProvider>
	);
}

export default MyApp;
