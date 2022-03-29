import { useMemo } from 'react';

// TODO: Improve the styling. it's so bland like my life
function Pagination({ totalPage, onClick }) {
	const pages = useMemo(() => {
		const setIndex = (index) => onClick(index);
		const pages = [];
		for (let i = 0; i < Math.ceil(totalPage / 10); i++) {
			pages.push(
				<ul
					className="inline-flex items-center justify-center w-10 h-10 bg-dark-03dp mr-1 mb-1 cursor-pointer"
					key={i}
					onClick={() => setIndex(i)}
				>
					{i + 1}
				</ul>
			);
		}
		return pages;
	}, [totalPage, onClick]);

	return <nav className="dark:text-white">{pages}</nav>;
}

export default Pagination;
