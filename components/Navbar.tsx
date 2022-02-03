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

	useEffect(() => {
		window.onscroll = () => {
			if (navRef.current) {
				const pageY = window.pageYOffset;
				if (pageY > 0) {
					navRef.current.style.display = 'none';
				} else {
					navRef.current.style.display = 'grid';
				}
			}
		};
	}, [navRef.current]);

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
