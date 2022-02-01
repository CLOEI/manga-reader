import {
	AiFillBook,
	AiOutlineBook,
	AiOutlineHistory,
	AiFillCompass,
	AiOutlineCompass,
	AiFillSetting,
	AiOutlineEllipsis,
} from 'react-icons/ai';
import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

function Navbar() {
	const navbar = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		window.onscroll = () => {
			const pageOffset = window.scrollY;

			if (pageOffset > 20 && navbar.current) {
				navbar.current.style.bottom = '-100%';
				navbar.current.style.visibility = 'hidden';
			} else if (navbar.current) {
				navbar.current.style.bottom = '0';
				navbar.current.style.visibility = 'visible';
			}
		};

		return () => {
			window.onscroll = null;
		};
	}, []);

	const library = () => {
		router.push('/');
	};
	const history = () => {
		router.push('/history');
	};
	const discover = () => {
		router.push('/discover');
	};
	const other = () => {
		router.push('/other');
	};

	return (
		<nav
			className="grid absolute grid-cols-4 bottom-0 right-0 left-0 bg-gray-800 text-gray-300 pt-1 transition-all duration-700"
			ref={navbar}
		>
			<button
				className="flex items-center justify-center flex-col py-2"
				onClick={library}
			>
				<AiOutlineBook size={24} />
				<p>Library</p>
			</button>
			<button
				className="flex items-center justify-center flex-col py-2"
				onClick={history}
			>
				<AiOutlineHistory size={24} />
				<p>History</p>
			</button>
			<button
				className="flex items-center justify-center flex-col py-2"
				onClick={discover}
			>
				<AiOutlineCompass size={24} />
				<p>Discover</p>
			</button>
			<button
				className="flex items-center justify-center flex-col py-2"
				onClick={other}
			>
				<AiOutlineEllipsis size={24} />
				<p>Other</p>
			</button>
		</nav>
	);
}

export default Navbar;
