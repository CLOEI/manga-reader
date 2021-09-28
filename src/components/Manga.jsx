import Cover from "./Cover.jsx";

function Manga({ mangaID, coverID, title, onClick }) {
	return (
		<div
			onClick={onClick}
			style={{ margin: "1em 1em 0 1em", width: "130px", cursor: "pointer" }}
		>
			<Cover
				mangaID={mangaID}
				coverID={coverID}
				style={{ width: "128px", height: "180px" }}
				alt={title}
			/>
			<p>{title}</p>
		</div>
	);
}

export default Manga;
