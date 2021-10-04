import { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as DotsIcon } from "../assets/dots.svg";
import classes from "../styles/Home.module.css";
import styled from "styled-components";
import Manga from "../components/Manga";

const NotFound = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 60px);

	h2 {
		font-size: 3rem;
	}
	p {
		margin-top: 0.5em;
	}
`;

function Home() {
	const [searchToggled, setSearchToggled] = useState(false);
	const [currentTab, setCurrentTab] = useState("Library");
	const [favManga, setFavManga] = useState(null);
	const [mangaData, setMangaData] = useState(null);

	useEffect(() => {
		const data = localStorage.getItem("favMangas");
		if (data == null) {
			localStorage.setItem("favMangas", JSON.stringify([]));
		} else {
			let query = ""; // if found other better way might want to change this.
			if (JSON.parse(data).length > 1) {
				for (let x = 1; x < JSON.parse(data).length; x++) {
					query += `&ids[]=${JSON.parse(data)[x]}`;
				}
			}

			fetch(`/api/manga?ids[]=${JSON.parse(data)[0]}${query}`)
				.then((res) => res.json())
				.then((data) => setFavManga(data));
		}

		fetch(`/api/manga?limit=100`)
			.then((res) => res.json())
			.then((data) => setMangaData(data));
	}, []);

	async function searchHandler(e) {
		e.preventDefault();
		if (currentTab === "Discover") {
			const data = await (
				await fetch(`/api/manga?title=${e.target.title.value}&limit=100`)
			).json();
			setMangaData(data);
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<h1>{currentTab}</h1>
				<div className={classes.search}>
					<form onSubmit={searchHandler}>
						<input
							type="text"
							name="title"
							placeholder="Input name here"
							style={{ display: `${searchToggled ? "inline-block" : "none"}` }}
						/>
					</form>
					{currentTab !== "About" && (
						<SearchIcon onClick={() => setSearchToggled(!searchToggled)} />
					)}
				</div>
			</div>
			<main>
				{currentTab === "Library" && (
					<div>
						{favManga ? (
							<div className={classes.fav_container}>
								{favManga.data.map((item, i) => {
									const coverID = item.relationships.filter(
										(val) => val.type === "cover_art"
									)[0].id;
									return (
										<Manga
											mangaID={item.id}
											coverID={coverID}
											title={
												item.attributes.title[
													Object.keys(item.attributes.title)[0]
												]
											}
											key={i}
										/>
									);
								})}
							</div>
						) : localStorage.getItem("favMangas") == null ? (
							<NotFound>
								<h2>( ˘︹˘ )</h2>
								<p>No favourites yet..</p>
							</NotFound>
						) : (
							<NotFound>
								<h2>╰(°∇≦*)╮</h2>
								<p>Adding ur fav!</p>
							</NotFound>
						)}
					</div>
				)}
				{currentTab === "Discover" && (
					<div className={classes.manga_container}>
						{mangaData &&
							mangaData.data.map((item, i) => {
								const coverID = item.relationships.filter(
									(val) => val.type === "cover_art"
								)[0].id;
								return (
									<Manga
										mangaID={item.id}
										coverID={coverID}
										title={
											item.attributes.title[
												Object.keys(item.attributes.title)[0]
											]
										}
										key={i}
									/>
								);
							})}
					</div>
				)}
				{currentTab === "About" && (
					<div className={classes.about_container}>
						<div>
							<h2>まんが</h2>
							<p>( Manga )</p>
						</div>
					</div>
				)}
			</main>
			<div
				className={classes.footer}
				style={{ fontWeight: "bold", textTransform: "uppercase" }}
			>
				<div onClick={() => setCurrentTab("Library")}>
					<p>Library</p>
				</div>
				<div onClick={() => setCurrentTab("Discover")}>
					<p>Discover</p>
				</div>
				<div onClick={() => setCurrentTab("About")}>
					<DotsIcon />
				</div>
			</div>
		</div>
	);
}

export default Home;
