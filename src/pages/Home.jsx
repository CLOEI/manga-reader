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
		fetch(`/api/manga?limit=100`)
			.then((res) => res.json())
			.then((data) => setMangaData(data));

		return () => {
			setMangaData(null);
		};
	}, []);

	function searchHandler() {
		setSearchToggled(!searchToggled);
	}

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<h1>{currentTab}</h1>
				<div className={classes.search}>
					<input
						type="text"
						style={{ display: `${searchToggled ? "inline-block" : "none"}` }}
					/>
					{currentTab !== "About" && <SearchIcon onClick={searchHandler} />}
				</div>
			</div>
			<main>
				{currentTab === "Library" && (
					<div>
						{favManga ? (
							"Hello"
						) : (
							<NotFound>
								<h2>( ˘︹˘ )</h2>
								<p>No favourites yet..</p>
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
			<div className={classes.footer}>
				<div onClick={() => setCurrentTab("Library")}>Library</div>
				<div onClick={() => setCurrentTab("Discover")}>Discover</div>
				<div onClick={() => setCurrentTab("About")}>
					<DotsIcon />
				</div>
			</div>
		</div>
	);
}

export default Home;
