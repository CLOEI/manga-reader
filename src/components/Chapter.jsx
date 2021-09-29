import { useState, useEffect } from "react";
import { container } from "../styles/chapter.module.css";
import { format } from "date-fns";
import axios from "axios";

function Chapter({
	volume,
	chapter,
	title,
	date,
	scanlationID,
	onClick,
	chapterID,
}) {
	const [scanlation, setScanlation] = useState(null);

	useEffect(() => {
		if (scanlationID === undefined) return;

		axios
			.get(`https://api.mangadex.org/group/${scanlationID.id}`)
			.then((res) => res.data)
			.then((data) => setScanlation(data.data.attributes.name));
	}, [scanlationID]);
	return (
		<div className={container} onClick={(e) => onClick(e, chapterID)}>
			<p>
				{volume
					? title
						? `Vol.${volume} Ch.${chapter} - ${title}`
						: `Vol.${volume} Ch.${chapter}`
					: title
					? `Ch.${chapter} - ${title}`
					: `Ch.${chapter}`}
			</p>
			<p>
				{scanlation
					? `${format(new Date(date), "dd-MM-yy")} • ${scanlation}`
					: `${format(new Date(date), "dd-MM-yy")}`}
			</p>
		</div>
	);
}

export default Chapter;
