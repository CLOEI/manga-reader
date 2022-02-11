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
	const router = useRouter();
	const navRef = useRef<HTMLDivElement>(null);
	const lastNum = useRef(0);

	useEffect(() => {
		lastNum.current = window.scrollY;
		window.onscroll = () => {
			if (navRef.current) {
				const pageY = window.scrollY;
				if (pageY > lastNum.current) {
					navRef.current.style.display = 'none';
				} else {
					navRef.current.style.display = 'grid';
				}
				lastNum.current = window.scrollY;
			}
		};
		return () => {
			window.onscroll = null;
		};
	}, []); // we don't need any dependency.

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
			className="grid fixed grid-cols-4 bottom-0 right-0 left-0 bg-gray-800 text-gray-300 pt-1 transition-all duration-700 ease-in-out z-[999]"
			ref={navRef}
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
				disabled
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
