import React from 'react';

import Link from 'next/link';

interface Props {
	mangaChapter: MangaChapters;
}

function ChapterCard({ mangaChapter }: Props) {
	return (
		<Link href={`/read/${mangaChapter.id}`}>
			<a className="px-2 py-3 bg-gray-800 mb-1 block">
				{mangaChapter?.volume
					? mangaChapter?.title
						? `Vol.${mangaChapter.volume} Ch.${mangaChapter.chapter} - ${mangaChapter.title}`
						: `Vol.${mangaChapter.volume} Ch.${mangaChapter.chapter}`
					: mangaChapter?.title
					? `Ch.${mangaChapter.chapter} - ${mangaChapter.title}`
					: `Ch.${mangaChapter?.chapter}`}
				{/* <p>
				{scanlation
					? `${format(new Date(date), 'dd-MM-yy')} • ${scanlation}`
					: `${format(new Date(date), 'dd-MM-yy')}`}
        </p> */}
			</a>
		</Link>
	);
}

export default ChapterCard;
