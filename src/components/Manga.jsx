import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "../styles/Manga.module.css";

function Manga({ mangaID, coverID, title }) {
	const [cover, setCover] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();

		fetch(`/api/cover/${coverID}`, { signal: abortCont.signal })
			.then((res) => res.json())
			.then((data) => {
				setCover(data);
			})
			.catch((err) => {
				if (err.name === "AbortError") return;
			});
		return () => abortCont.abort();
	}, [coverID]);

	return (
		<Link to={`/manga?id=${mangaID}`} className={classes.container}>
			<LazyLoadImage
				src={
					cover &&
					`https://uploads.mangadex.org/covers/${mangaID}/${cover.data.attributes.fileName}.256.jpg`
				}
				width="158px"
				height="210px"
				effect="opacity"
			/>
			<p>{title}</p>
		</Link>
	);
}

export default Manga;
