import { GetServerSidePropsContext } from 'next';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';

type Props = {
	baseData: any;
	chapterData: any;
};

function Read({ baseData, chapterData }: Props) {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const chapterBaseUrl = baseData.baseUrl;
	const chapterHash = baseData.chapter.hash;
	const quality = baseData.chapter['data'];

	console.log(chapterData);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	const goBack = () => {
		router.back();
	};

	return (
		<Layout>
			<Head>
				<title>Read</title>
			</Head>
			<header className="absolute top-0 left-0 w-full bg-gray-800 h-12 px-2 flex items-center justify-between z-10">
				<button onClick={goBack}>
					<AiOutlineArrowLeft size={24} />
				</button>
			</header>
			<div className="flex h-screen items-center">
				<div className="relative">
					<img
						src={`${chapterBaseUrl}/data/${chapterHash}/${quality[currentPage - 1]}`}
					/>
				</div>
				<Pagination
					currentPage={currentPage}
					totalPages={quality.length}
					onPageChange={onPageChange}
					containerClassName="absolute bottom-0 right-1/2 translate-x-1/2"
				/>
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
