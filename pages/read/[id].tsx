import { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import {
	AiOutlineArrowLeft,
	AiOutlineArrowUp,
	AiFillCaretLeft,
	AiFillCaretRight,
} from 'react-icons/ai';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '../../components/Layout';
import MangaChapter from '../../utils/MangaChapter';

type Props = {
	baseData: any;
	chapterData: any;
};

function Read({ baseData, chapterData }: Props) {
	const chapter = new MangaChapter(chapterData.data);
	const router = useRouter();
	const navRef = useRef<HTMLDivElement>(null);
	const lastNum = useRef(0);
	const chapterBaseUrl = baseData.baseUrl;
	const chapterHash = baseData.chapter.hash;
	const quality = baseData.chapter['data'];

	useEffect(() => {
		lastNum.current = window.scrollY;
		window.onscroll = () => {
			if (navRef.current) {
				const pageY = window.scrollY;
				if (pageY > lastNum.current) {
					navRef.current.style.display = 'none';
				} else {
					navRef.current.style.display = 'flex';
				}
				lastNum.current = window.scrollY;
			}
		};
		return () => {
			window.onscroll = null;
		};
	}, []);

	const goBack = () => {
		router.back();
	};
	const goUP = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	/*
    TODO: Implement a button that can go to next/previous chapter.
  */
	const nextChapter = () => {
		return;
	};
	const preChapter = () => {
		return;
	};

	return (
		<Layout>
			<Head>
				<title>{chapter.title}</title>
			</Head>
			<header
				className="flex fixed top-0 w-full bg-gray-800 h-12 px-2 items-center justify-between z-10"
				ref={navRef}
			>
				<button onClick={goBack}>
					<AiOutlineArrowLeft size={24} />
				</button>
				<div>
					<div className="flex items-center">
						<p className="font-semibold mx-3">{chapter.title}</p>
					</div>
				</div>
			</header>
			<main className="flex flex-col mt-14 items-center">
				{quality.map((fileName: string, i: number) => {
					return (
						<img src={`${chapterBaseUrl}/data/${chapterHash}/${fileName}`} key={i} />
					);
				})}
				<div className="flex items-center justify-center w-full h-20 bg-gray-50 text-gray-900">
					<p className="font-semibold">Made with ❤️️ by Cendy powered by MangaDex</p>
				</div>
			</main>
			<div
				className="fixed bottom-4 right-4 w-16 h-16 bg-slate-200 rounded-lg text-gray-700 flex justify-center items-center"
				onClick={goUP}
			>
				<AiOutlineArrowUp size={36} />
			</div>
		</Layout>
	);
}

export default Read;
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const params = context.params;
	const baseRes = await fetch(
		`https://api.mangadex.org/at-home/server/${params?.id}`
	);
	const chapterRes = await fetch(
		`https://api.mangadex.org/chapter/${params?.id}`
	);
	const baseData = await baseRes.json();
	const chapterData = await chapterRes.json();

	return {
		props: {
			baseData,
			chapterData,
		},
	};
}
