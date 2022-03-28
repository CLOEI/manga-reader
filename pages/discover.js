import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Container from '../components/Container';
import Loader from '../components/Loader';
import Manga from '../components/Manga';
import Emoji from '../components/Emoji';

function Discover() {
	const router = useRouter();
	const query = router.query;

	const {
		data: mangaResponse,
		error,
		setSize,
		size,
		isValidating,
	} = useSWRInfinite((offset, previousPageData) => {
		if (previousPageData && !previousPageData.data.length > 0) return null;
		return `/api/manga?includes[]=cover_art&title=${
			query?.s || ''
		}&limit=20&offset=${offset * 20}`;
	});

	const [ref, inView] = useInView({ triggerOnce: true });
	const [isSearching, setIsSearching] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (inView) {
			setSize(size + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	useEffect(() => {
		if (isSearching) {
			inputRef.current.focus();
		}
	}, [isSearching]);

	const toggleSearching = () => setIsSearching(!isSearching);
	const goBack = () => router.back();

	if (error) {
		console.log(error); // I let this here for now.
	}

	console.log(mangaResponse && !(mangaResponse[0].data.length > 0));

	return (
		<Container>
			<Head>
				<title>Discover</title>
			</Head>
			<header className="flex justify-between bg-dark-01dp h-12 items-center px-2">
				<button className="text-white" onClick={goBack}>
					<AiOutlineArrowLeft size={32} />
				</button>
				{isSearching && (
					<form>
						<input
							type="text"
							placeholder="Search"
							className="flex-1 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
							autoComplete="off"
							name="s"
							ref={inputRef}
						/>
					</form>
				)}
				<button className="text-white" onClick={toggleSearching}>
					<AiOutlineSearch size={32} />
				</button>
			</header>
			<main className="relative grid grid-cols-2 gap-1 px-2 my-2 flex-grow">
				{mangaResponse && !(mangaResponse[0].data.length > 0) && (
					<Emoji text="No data" type="err" />
				)}
				{mangaResponse &&
					mangaResponse
						.reduce((acc, curr) => {
							return acc.concat(curr.data);
						}, [])
						.map(({ attributes, id, relationships }, i, arr) => {
							const availableLang = attributes.availableTranslatedLanguages;
							const titleObj = attributes.title;
							const fileName = relationships.filter(
								(item) => item.type === 'cover_art'
							)[0].attributes.fileName;

							if (i === arr.length - 1) {
								return (
									<Manga
										manga={{ availableLang, titleObj, id, fileName }}
										key={i}
										ref={ref}
									/>
								);
							}
							return (
								<Manga manga={{ availableLang, titleObj, id, fileName }} key={i} />
							);
						})}
				{isValidating && <Loader />}
			</main>
		</Container>
	);
}

export default Discover;
