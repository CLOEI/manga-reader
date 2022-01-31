import { useEffect, useState } from 'react';
import {
	AiOutlineArrowLeft,
	AiOutlineHeart,
	AiFillHeart,
} from 'react-icons/ai';
import useSWR from 'swr';
import classNames from 'classnames';

import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Error from 'next/error';

import Manga from '../../utils/Manga';
import Layout from '../../components/Layout';
import ChapterCard from '../../components/ChapterCard';
import Pagination from '../../components/Pagination';
import MangaChapter from '../../utils/MangaChapter';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MangaPage({ data }: any) {
	if (data.result === 'error') return <Error statusCode={404} />;
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [showMore, setShowMore] = useState(false);
	const manga = new Manga(data.data);
	const { data: chapterData, error } = useSWR(
		`/api/chapter?manga=${
			manga.id
		}&translatedLanguage[]=en&limit=50&includes[]=scanlation_group&offset=${
			(currentPage - 1) * 50
		}&order[volume]=desc&order[chapter]=desc`,
		fetcher
	);

	const goBack = () => {
		router.back();
	};

	const addToFav = () => {};

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<Layout>
			<Head>
				<title>{manga.title}</title>
			</Head>
			<header className="sticky top-0 left-0 w-full bg-gray-800 h-12 px-2 flex items-center justify-between z-10">
				<button onClick={goBack}>
					<AiOutlineArrowLeft size={24} />
				</button>
			</header>
			<div className="info-container px-6 py-4">
				<div className="absolute h-40 w-full after:absolute after:top-0 after:left-0 after:w-full after:h-40 after:bg-gradient-to-t after:from-gray-900 after:to-[rgba(28,28,28,0.8)] overflow-hidden -z-[1] clip">
					<div
						className="fixed bg-cover w-full h-40 bg-center"
						style={{
							backgroundImage: `url(https://uploads.mangadex.org/covers/${manga.id}/${manga.fileName})`,
						}}
					></div>
				</div>
				<div className="relative pb-[142%]" style={{ gridArea: 'cover' }}>
					<Image
						src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.fileName}`}
						layout="fill"
					/>
				</div>
				<div style={{ gridArea: 'title' }}>
					<h1 className="font-bold text-3xl line-clamp-2">{manga.title}</h1>
				</div>
				<div style={{ gridArea: 'info' }}>
					<p>{manga.author}</p>
					<p>{manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}</p>
				</div>
				<div className="my-5" style={{ gridArea: 'buttons' }}>
					<button
						className="inline-flex w-full flex-col items-center"
						onClick={addToFav}
					>
						<AiOutlineHeart size={56} />
						<span>Add to library</span>
					</button>
				</div>
				<div style={{ gridArea: 'desc' }}>
					<div>
						<p
							className={classNames({
								'line-clamp-5': !showMore,
							})}
						>
							{manga.desc}
						</p>
						<span
							className="text-indigo-600 hover:underline"
							onClick={() => setShowMore((state) => !state)}
						>
							{showMore ? 'Show less...' : 'Show more...'}
						</span>
					</div>
					<ul className="my-2">
						{manga.tags.map((tag, i) => {
							return (
								<li
									className="inline-block p-2 bg-gray-800 mr-1 my-1 rounded-lg text-xs"
									key={i}
								>
									{tag}
								</li>
							);
						})}
					</ul>
				</div>
				<div style={{ gridArea: 'content' }}>
					<p className="text-xl font-semi mb-5">
						Total {chapterData?.total || 0} chapter
					</p>
					<ul>
						{chapterData &&
							chapterData.data.map((data: any) => {
								const chapter = new MangaChapter(data);

								return <ChapterCard mangaChapter={chapter} key={chapter.id} />;
							})}
					</ul>
					{chapterData?.total && (
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(chapterData.total / 50)}
							onPageChange={onPageChange}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
}

export default MangaPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const params = context.params;
	const res = await fetch(
		`https://api.mangadex.org/manga/${params?.id}?includes[]=cover_art&includes[]=author`
	);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}