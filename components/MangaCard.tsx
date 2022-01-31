import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type MangaCardProps = {
	manga: Manga;
};

function MangaCard({ manga }: MangaCardProps) {
	return (
		<Link href={`/manga/${manga.id}`}>
			<a className="relative block cursor-pointer">
				<div className="relative w-full pb-[150%] bg-gray-800 rounded-md overflow-hidden">
					<Image
						src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.fileName}`}
						layout="fill"
					/>
					<div className="absolute bottom-0 left-0 w-full after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-gray-900 after:opacity-30">
						<p className="relative z-10 text-white font-bold after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0  after:backdrop-blur-sm after:-z-10 px-1 pb-1 line-clamp-2">
							{manga.title}
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default MangaCard;
