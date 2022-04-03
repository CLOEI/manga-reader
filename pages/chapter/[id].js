import { useRef, useState, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useSWR from 'swr';

import { useRouter } from 'next/router';
import Error from 'next/error';
import Head from 'next/head';

import extractChapterData from '../../utils/extractChapterData';
import ChapterImage from '../../components/ChapterImage';

const PREFFERED_MODE = 'data';

function Index({ chapter: chapterData }) {
	const router = useRouter();
	const containerRef = useRef(null);
	const [nav, setNav] = useState(false);
	const { id, chapter, volume, title, mangaTitle } = extractChapterData(
		chapterData.data
	);
	const { data, error } = useSWR(`/api/at-home/server/${id}`);

	if (error) {
		// Chapter not available on mangaDex server will return an error
		return <Error statusCode={error.status} />;
	}

	const clickHandler = () => setNav(!nav);
	const goBack = () => router.back();

	return (
		<div>
			<Head>
				<title>{title || mangaTitle}</title>
			</Head>
			<main className="">
				<div className="" ref={containerRef}>
					{data && <ChapterImage data={data} ref={containerRef} />}
				</div>
				<button
					className="fixed w-60 h-60 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20"
					onClick={clickHandler}
				></button>
			</main>
			{data && nav && (
				<nav>
					<div className="fixed flex top-0 left-0 right-0 h-12 px-2 bg-dark-01dp text-white items-center">
						<button onClick={goBack}>
							<AiOutlineArrowLeft size={32} />
						</button>
					</div>
					<div className="fixed flex justify-around items-center bottom-4 w-max px-4 bg-dark-02dp h-20 rounded-3xl left-[50%] -translate-x-[50%] text-white font-bold">
						<Slider max={data.chapter[PREFFERED_MODE].length} />
					</div>
				</nav>
			)}
		</div>
	);
}

function Slider({ max }) {
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(window.location.hash.replace('#', '') || 0);
	}, []);

	const handleChange = (e) => {
		const image = document.getElementById(e.target.value);
		window.scrollTo({
			top: image.offsetTop,
			behavior: 'smooth',
		});
		setPage(e.target.value);
	};

	return (
		<>
			<p>{page}</p>
			<input
				type="range"
				className="accent-rose-500 mx-4"
				value={page}
				onChange={handleChange}
				min="1"
				max={max}
				step="1"
			/>
			<p>{max}</p>
		</>
	);
}

export async function getServerSideProps(context) {
	const chapterID = context.params.id;
	const res = await fetch(
		`https://api.mangadex.org/chapter/${chapterID}?includes[]=manga`
	);
	const data = await res.json();

	return {
		props: {
			chapter: data,
		},
	};
}

export default Index;
