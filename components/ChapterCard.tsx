import React from 'react';

interface Props {
	mangaChapter: MangaChapter;
}

function ChapterCard({ mangaChapter }: Props) {
	return (
		<li className="px-2 py-3 bg-gray-800 mb-1">
			<p>
				{mangaChapter?.volume
					? mangaChapter?.title
						? `Vol.${mangaChapter.volume} Ch.${mangaChapter.chapter} - ${mangaChapter.title}`
						: `Vol.${mangaChapter.volume} Ch.${mangaChapter.chapter}`
					: mangaChapter?.title
					? `Ch.${mangaChapter.chapter} - ${mangaChapter.title}`
					: `Ch.${mangaChapter?.chapter}`}
			</p>
			{/* <p>
				{scanlation
					? `${format(new Date(date), 'dd-MM-yy')} • ${scanlation}`
					: `${format(new Date(date), 'dd-MM-yy')}`}
			</p> */}
		</li>
	);
}

export default ChapterCard;
