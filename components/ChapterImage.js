import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGesture } from '@use-gesture/react';

import NextImage from 'next/image';

import Loader from '../components/Loader';
import Emoji from '../components/Emoji';

const PREFFERED_MODE = 'data';

// TODO: Implement gesture.
const ChapterImage = React.forwardRef(({ data }, ref) => {
	return (
		<>
			{data.chapter[PREFFERED_MODE].length > 0 ? (
				data.chapter[PREFFERED_MODE].map((item, i) => {
					return <Image data={data} item={item} alt="" key={i} id={i + 1} />;
				})
			) : (
				<Emoji text="No data" type="err" />
			)}
		</>
	);
});

function Image({ data, item, alt, id }) {
	const [ref, inView] = useInView({
		threshold: 0.5,
	});
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (inView) {
			history.replaceState(null, null, `#${id}`);
		}
	}, [inView, id]);

	return (
		<div id={id} className="relative w-full pt-[calc((6/4)*100%)]" ref={ref}>
			{!loaded && (
				<div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0">
					<Loader />
				</div>
			)}
			<NextImage
				src={`${data.baseUrl}/${PREFFERED_MODE}/${data.chapter.hash}/${item}`}
				layout="fill"
				alt={alt}
				onLoadingComplete={() => setLoaded(true)}
			/>
		</div>
	);
}

ChapterImage.displayName = 'ChapterImage';

export default ChapterImage;
