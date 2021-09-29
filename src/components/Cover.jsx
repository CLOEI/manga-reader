import { useState, useEffect } from "react";
import axios from "axios";

function Cover({ mangaID, coverID, style, alt }) {
	const [cover, setCover] = useState(null);

	useEffect(() => {
		axios
			.get(`https://api.mangadex.org/cover/${coverID}`)
			.then((res) => res.data)
			.then((data) => {
				setCover(
					`https://uploads.mangadex.org/covers/${mangaID}/${data.data.attributes.fileName}.256.jpg`
				);
			});
	}, [mangaID, coverID]);
	return <img src={cover} style={style} alt={alt} />;
}

export default Cover;
