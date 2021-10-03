import { useState, useEffect } from "react";
import { container, header } from "../styles/Home.module.css";
import { ReactComponent as ArrowIcon } from "../assets/arrowleft.svg";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Tag from "../components/Tag";
import classes from "../styles/MangaPage.module.css";

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

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Manga() {
	const id = useQuery().get("id");
	const [mangaData, setMangaData] = useState(null);

	useEffect(() => {
		async function getData() {
			const manga = await (await fetch(`/api/manga?ids[]=${id}`)).json();
			const coverID = manga.data[0].relationships.filter(
				(val) => val.type === "cover_art"
			)[0].id;
			const authorID = manga.data[0].relationships.filter(
				(val) => val.type === "author"
			)[0].id;
			const author = await (await fetch(`/api/author/${authorID}`)).json();
			const cover = await (await fetch(`/api/cover/${coverID}`)).json();
			const coverURL = `https://uploads.mangadex.org/covers/${manga.data[0].id}/${cover.data.attributes.fileName}.256.jpg`;
			const tags = manga.data[0].attributes.tags.map(
				(val) => val.attributes.name[Object.keys(val.attributes.name)[0]]
			);

			setMangaData({
				mangaData: manga,
				coverURL,
				tags,
				author,
			});
		}
		getData();
	}, [id]);

	return (
		<div className={container}>
			<div className={header}>
				<Link to="/" style={{ color: "inherit" }}>
					<ArrowIcon />
				</Link>
			</div>
			<main>
				{id ? (
					mangaData && (
						<div>
							<div>
								<div className={classes.header}>
									<div
										className={classes.header_background}
										style={{
											backgroundImage: `url(${mangaData.coverURL})`,
											height: "200px",
											backgroundRepeat: "no-repeat",
											backgroundSize: "cover",
											backgroundPosition: "0 10%",
										}}
									></div>
									<div className={classes.header_items}>
										<img src={mangaData.coverURL} alt="manga cover" />
										<div>
											<h2>
												{
													mangaData.mangaData.data[0].attributes.title[
														Object.keys(
															mangaData.mangaData.data[0].attributes.title
														)[0]
													]
												}
											</h2>
											<p>{mangaData.author.data.attributes.name}</p>
										</div>
									</div>
								</div>
								<div className={classes.info} style={{ margin: "1em 1em" }}>
									<div style={{ padding: "1em 0" }}>
										<div>
											<HeartIcon />
											<p>Add to Library</p>
										</div>
									</div>
									<p>
										{
											mangaData.mangaData.data[0].attributes.description[
												Object.keys(
													mangaData.mangaData.data[0].attributes.description
												)[0]
											]
										}
									</p>
									<div className={classes.tags_container}>
										{mangaData.tags.map((val, i) => {
											return <Tag name={val} key={i} />;
										})}
									</div>
								</div>
							</div>
						</div>
					)
				) : (
					<NotFound>
						<h2>~(˘▾˘~)</h2>
						<p>Seems like something went wrong!</p>
					</NotFound>
				)}
			</main>
		</div>
	);
}

export default Manga;
