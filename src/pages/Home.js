import Manga from "../components/Manga.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [title, setTitle] = useState(null);
	const [mangaData, setMangaData] = useState(null);

	useEffect(() => {
		if (title == null) return;
		fetch(`https://api.mangadex.org/manga?title=${title}`)
			.then((res) => res.json())
			.then((data) => {
				setMangaData(data);
			});
	}, [title]);

	function submitHandler(e) {
		e.preventDefault();
		setTitle(e.target.manga_title.value);
	}

	return (
		<div>
			<header className="header-container">
				<h1>漫画</h1>
				<p>( Manga )</p>
				<form onSubmit={submitHandler}>
					<div className="search-box">
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
						<input type="text" name="manga_title" />
					</div>
				</form>
			</header>
			<main>
				<div className="manga-container">
					{mangaData &&
						mangaData.data.map((val) => {
							const coverID = val.relationships.filter(
								(val) => val.type === "cover_art"
							);
							return (
								<Link
									to={`/manga?id=${val.id}`}
									style={{ textDecoration: "none", color: "black" }}
									key={val.id}
								>
									<Manga
										mangaID={val.id}
										coverID={coverID[0].id}
										title={
											val.attributes.title[Object.keys(val.attributes.title)[0]]
										}
									/>
								</Link>
							);
						})}
				</div>
			</main>
		</div>
	);
}

export default Home;
