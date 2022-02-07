import classNames from 'classnames';
import { useMemo } from 'react';

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	containerClassName?: string;
}
const range = (start: number, end: number) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, i) => i + start);
};

const Index = ({
	currentPage,
	totalPages,
	onPageChange,
	containerClassName,
}: Props) => {
	const paginationRange = useMemo(() => {
		const maxPage = 5;

		let leftNum = currentPage - Math.floor(maxPage / 2);
		let rightNum = currentPage + Math.floor(maxPage / 2);

		if (leftNum < 1) {
			leftNum = 1;
			rightNum = maxPage;
		}
		if (rightNum > totalPages) {
			leftNum = totalPages - (maxPage - 1);
			rightNum = totalPages;
			if (leftNum < 1) {
				leftNum = 1;
			}
		}

		return range(leftNum, rightNum);
	}, [currentPage, totalPages]);

	const onNext = () => {
		onPageChange(totalPages);
	};
	const onPrevious = () => {
		onPageChange(1);
	};

	const disableNext = classNames({
		'pointer-events-none': currentPage === totalPages,
	});
	const disablePrevious = classNames({
		'pointer-events-none': currentPage === 1,
	});

	return (
		<div className={containerClassName}>
			<div className="mx-auto container py-10">
				<ul className="flex justify-center items-center">
					<li onClick={onPrevious} className={disablePrevious}>
						<span className="p-1 flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold text-gray-500 hover:text-indigo-700 focus:outline-none mr-1 sm:mr-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</span>
					</li>
					{paginationRange?.map((num, i) => {
						if (typeof num === 'number') {
							return (
								<li onClick={() => onPageChange(num)} key={i}>
									<span
										className={classNames({
											'flex hover:bg-indigo-600 hover:text-white text-base leading-tight font-bold cursor-pointer transition shadow duration-150 ease-in-out mx-2 sm:mx-4 rounded px-3 py-2 focus:outline-none':
												true,
											'text-indigo-700': num !== currentPage,
											'bg-indigo-600 text-white': num === currentPage,
										})}
									>
										{num}
									</span>
								</li>
							);
						} else {
							return (
								<li key={i}>
									<span className="flex text-indigo-700 hover:bg-indigo-600 hover:text-white text-base leading-tight font-bold cursor-pointer transition shadow duration-150 ease-in-out mx-2 sm:mx-4 rounded px-3 py-2 focus:outline-none">
										{num}
									</span>
								</li>
							);
						}
					})}
					<li onClick={onNext} className={disableNext}>
						<span className="flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold text-gray-500 hover:text-indigo-700 p-1 focus:outline-none ml-1 sm:ml-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Index;
