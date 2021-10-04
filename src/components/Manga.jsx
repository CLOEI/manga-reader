import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
		<Link to={`/manga?id=${mangaID}`}>
			<div
				className={classes.container}
				style={{
					backgroundImage: `${
						cover &&
						`url(https://uploads.mangadex.org/covers/${mangaID}/${cover.data.attributes.fileName}.256.jpg)`
					}`,
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<p>{title}</p>
			</div>
		</Link>
	);
}

export default Manga;
