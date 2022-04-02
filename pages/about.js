import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

import Head from 'next/head';

import Navbar from '../components/Navbar';
import Disabled from '../components/Disabled';

// TODO : Change default language option
function About() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<div>
			<Head>
				<title>About</title>
			</Head>
			<header className="flex justify-center items-center h-60 bg-violet-200 dark:bg-dark-01dp">
				<h1 className="text-white text-5xl font-bold">Flow</h1>
			</header>
			<main className="px-2">
				<button
					className="flex relative w-full items-center py-3 hover:cursor-not-allowed"
					onClick={toggleTheme}
					disabled
				>
					{theme === 'light' ? (
						<BiMoon className="text-rose-500" size={32} />
					) : (
						<BiSun className="text-rose-500 opacity-[38%]" size={32} />
					)}
					<span className="ml-1 text-disabled">Toggle theme</span>
					<Disabled />
				</button>
			</main>
			<Navbar />
		</div>
	);
}

export default About;
