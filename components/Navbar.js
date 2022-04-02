import { useEffect, useRef } from 'react';
import {
	AiOutlineBook,
	AiOutlineCompass,
	AiOutlineEllipsis,
} from 'react-icons/ai';

import { useRouter } from 'next/router';

function Navbar({ curr }) {
	const router = useRouter();
	const navbar = useRef(null);

	useEffect(() => {
		let windowHOffset = window.scrollY;
		if (navbar) {
			window.onscroll = () => {
				if (window.scrollY > windowHOffset) {
					navbar.current.style.display = 'none';
				} else {
					navbar.current.style.display = 'block';
				}
				windowHOffset = window.scrollY;
			};
		}

		return () => {
			window.onscroll = null;
		};
	}, [navbar]);

	const gotoHome = () => {
		router.push('/');
	};
	const gotoDiscover = () => {
		router.push('/discover');
	};
	const gotoAbout = () => {
		router.push('/about');
	};

	return (
		<nav
			className="fixed bottom-0 left-0 right-0 bg-violet-300 dark:bg-dark-01dp "
			ref={navbar}
		>
			<ul className="flex justify-evenly items-center h-20 text-violet-800 dark:text-white">
				<li className="group cursor-pointer select-none" onClick={gotoHome}>
					<AiOutlineBook
						size={32}
						className={`mx-auto group-hover:text-rose-500 ${
							router.pathname === '/' && 'text-rose-500'
						}`}
					/>
					<p>Library</p>
				</li>
				<li className="group cursor-pointer select-none" onClick={gotoDiscover}>
					<AiOutlineCompass
						size={32}
						className="mx-auto group-hover:text-rose-500"
					/>
					<p>Discover</p>
				</li>
				<li className="group cursor-pointer select-none" onClick={gotoAbout}>
					<AiOutlineEllipsis
						size={32}
						className={`mx-auto group-hover:text-rose-500  ${
							router.pathname === '/about' && 'text-rose-500'
						}`}
					/>
					<p>About</p>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
