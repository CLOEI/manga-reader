import { useState, useEffect } from "react";

function Cover({ mangaID, coverID, style, alt }) {
	const [cover, setCover] = useState(null);

	useEffect(() => {
		fetch(`https://api.mangadex.org/cover/${coverID}`, {
			mode: "cors",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				setCover(
					`https://uploads.mangadex.org/covers/${mangaID}/${data.data.attributes.fileName}.256.jpg`
				);
			});
	}, [mangaID, coverID]);
	return <img src={cover} style={style} alt={alt} />;
}

export default Cover;
