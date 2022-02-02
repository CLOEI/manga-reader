import { AiOutlineUser } from 'react-icons/ai';

import Head from 'next/head';
import Image from 'next/image';

import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

function Other() {
	const auth = useAuth();

	if (auth.user === null)
		return (
			<head>
				<title>Other</title>
			</head>
		);
	console.log(auth.user);

	return (
		<Layout>
			<Head>
				<title>Other</title>
			</Head>
			<header className="bg-gray-800 px-2">
				<div className="flex items-center h-12">
					<h1 className="font-bold text-xl">Other</h1>
				</div>
				<div className="flex items-center justify-center min-h-[8rem]">
					{auth.user ? (
						<div>
							<div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto">
								<Image
									src={auth.user.photoURL!}
									alt={auth.user.displayName!}
									layout="fill"
								/>
							</div>
							<p className="text-2xl my-3 text-center">{auth.user.displayName}</p>
						</div>
					) : (
						<h2 className="font-bold text-4xl">Manga</h2>
					)}
				</div>
			</header>
			<main>
				{auth.user ? (
					<button
						className="flex px-2 py-4 hover:bg-gray-600 w-full"
						onClick={() => auth.logout()}
					>
						<AiOutlineUser size={24} />
						<p className="ml-1">Logout</p>
					</button>
				) : (
					<button
						className="flex px-2 py-4 hover:bg-gray-600 w-full"
						onClick={() => auth.login()}
					>
						<AiOutlineUser size={24} />
						<p className="ml-1">Login</p>
					</button>
				)}
			</main>
			<Navbar />
		</Layout>
	);
}

export default Other;
