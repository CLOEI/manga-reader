import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';
import Loader from './Loader';

const PREFFERED_LANG = 'en';
const cardVariant = {
	visible: {
		opacity: 1,
		transition: {
			duration: 0.35,
		},
	},
	hidden: {
		opacity: 0,
	},
};

const Manga = React.forwardRef(({ manga }, ref) => {
	const { ref: cardRef, inView } = useInView();
	const [loaded, setLoaded] = useState(false);
	const control = useAnimation();

	const { availableLang, titleObj, id, fileName } = manga;
	const title =
		availableLang.indexOf(PREFFERED_LANG) > -1
			? titleObj.en
			: titleObj[Object.keys(titleObj)[0]];
	const coverURL = `https://uploads.mangadex.org/covers/${id}/${fileName}`;

	useEffect(() => {
		if (inView) {
			control.start('visible');
		} else {
			control.start('hidden');
		}
	}, [control, inView]);

	return (
		<Link href={`/manga/${id}`} passHref>
			<motion.a
				ref={cardRef}
				animate={control}
				initial="hidden"
				variants={cardVariant}
			>
				<div className="relative block w-full pt-[calc((6/4)*100%)] cursor-pointer overflow-hidden rounded-lg">
					{!loaded && (
						<div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0">
							<Loader />
						</div>
					)}
					<Image
						src={coverURL}
						layout="fill"
						alt={title}
						objectFit="cover"
						objectPosition="center"
						onLoadingComplete={() => setLoaded(true)}
					/>
				</div>
				<h2 className="truncate text-white font-bold cursor-text" ref={ref}>
					{title}
				</h2>
			</motion.a>
		</Link>
	);
});

Manga.displayName = 'Manga';

export default Manga;
