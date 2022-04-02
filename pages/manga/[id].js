import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsGlobe, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Error from 'next/error';

import useLocalStorage from '../../utils/useLocalStorage';
import extractMangaData from '../../utils/extractMangaData';
import mangaStatus from '../../constants/mangaStatus';
import Readmore from '../../components/Readmore';
import Tag from '../../components/Tag';
import ChapterList from '../../components/ChapterList';

const PREFFERED_LANG = 'en';

function Index({ manga }) {
	if (manga.result === 'error') {
		const ERROR_CODE = manga.errors[0].status;
		return <Error statusCode={ERROR_CODE} />;
	}
	return <Content manga={manga} />;
}

function Content({ manga }) {
	const { title, coverURL, desc, status, tags, author, id, language } = useMemo(
		() => extractMangaData(manga, PREFFERED_LANG),
		[manga]
	);
	const [data, setData] = useLocalStorage('library', []);
	const [isFavorite, setIsFavorite] = useState(false);
	const [pageIndex, setPageIndex] = useState(0);
	const router = useRouter();

	useEffect(() => {
		setIsFavorite(data.includes(id));
	}, [data, id]);

	const goBack = () => router.back();
	const setIndex = (index) => setPageIndex(index);
	const toggleFav = () => {
		if (data.includes(id)) {
			setData(data.filter((item) => item !== id));
			setIsFavorite(false);
		} else {
			setData([...data, id]);
			setIsFavorite(true);
		}
	};

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<header className="flex h-12 items-center px-2">
				<button className="text-white" onClick={goBack}>
					<AiOutlineArrowLeft size={32} />
				</button>
			</header>
			<main className="relative grid grid-areas-layout grid-cols-layout px-3 py-2 gap-x-4 gap-y-4">
				<div className="absolute h-48 w-full overflow-hidden clip-image after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:bg-gradient-to-t after:from-dark-00dp after:to-[rgba(28,28,28,0.75)]">
					<div className="fixed bottom-0 w-full top-0">
						<Image
							src={coverURL}
							alt={title}
							objectFit="cover"
							objectPosition="center"
							layout="fill"
						/>
					</div>
				</div>
				<div className="relative grid-in-cover overflow-hidden pt-[calc((6/4)*100%)] rounded-sm h-max">
					<Image src={coverURL} layout="fill" alt={title} />
				</div>
				<div className="relative grid content-center grid-in-title">
					<h1 className="text-white break-words font-bold text-2xl">{title}</h1>
					<p className="text-high">{author}</p>
					<p className="text-medium">{mangaStatus[status]}</p>
				</div>
				<div className="grid-in-tool flex justify-around items-center">
					<button
						className="text-rose-500 w-full py-2 hover:bg-dark-01dp rounded-sm"
						onClick={toggleFav}
					>
						{isFavorite ? (
							<BsHeartFill size={32} className="mx-auto" />
						) : (
							<BsHeart size={32} className="mx-auto" />
						)}
						<span>Add to library</span>
					</button>
					<a
						href={`https://mangadex.org/title/${id}`}
						target="_blank"
						rel="noreferrer"
						className="block w-full"
					>
						<button className="text-white w-full py-2 hover:bg-dark-01dp rounded-sm">
							<BsGlobe size={32} className="mx-auto" />
							<span>Open from MangaDex</span>
						</button>
					</a>
				</div>
				<div className="grid-in-desc">
					<Readmore>{desc}</Readmore>
				</div>
				<div className="grid-in-tags my-2 flex items-center overflow-x-scroll mb-2 no-scrollbar">
					{tags.map((tag, i) => {
						return <Tag tag={tag} key={i} />;
					})}
				</div>
				<div className="grid-in-chapter">
					<ChapterList
						id={id}
						pageIndex={pageIndex}
						language={language}
						setIndex={setIndex}
					/>
					{/* Used for pre-fetch */}
					<div className="hidden">
						<ChapterList
							id={id}
							pageIndex={pageIndex + 1}
							language={language}
							setIndex={setIndex}
							className="hidden"
						/>
					</div>
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const mangaID = context.params.id;
	const res = await fetch(
		`https://api.mangadex.org/manga/${mangaID}?includes[]=cover_art&includes[]=author`
	);
	const data = await res.json();

	return {
		props: {
			manga: data,
		},
	};
}

export default Index;
