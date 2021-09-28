import Cover from "../components/Cover";
import Chapter from "../components/Chapter.jsx";
import Tag from "../components/Tag.jsx";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
	container,
	manga_title,
	header,
	chapter_container,
	abso,
	closeButton,
} from "../styles/manga.module.css";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Manga() {
	const mangaID = useQuery().get("id");
	const [data, setData] = useState(null);
	const [chapterData, setChapterData] = useState(null);
	const [chapterImage, setChapterImage] = useState(null);
	const chapterContainer = useRef(null);

	useEffect(() => {
		if (mangaID == null) return;

		fetch(`https://api.mangadex.org/manga?ids[]=${mangaID}`)
			.then((res) => res.json())
			.then((data) => {
				const authorID = data.data[0].relationships.filter(
					(val) => val.type === "author"
				)[0];

				if (authorID == null) throw data;

				fetch(`https://api.mangadex.org/author/${authorID.id}`)
					.then((res) => res.json())
					.then((authorData) => {
						setData({
							mangaData: data,
							tags: data.data[0].attributes.tags,
							authorData,
						});
					});
			})
			.catch((data) => {
				setData({
					mangaData: data,
					tags: data.data[0].attributes.tags,
				});
			});
	}, [mangaID]);

	useEffect(() => {
		if (mangaID == null) return;

		const data = fetch(
			`https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&limit=100&order[chapter]=desc`
		).then((res) => res.json());

		data.then((oldData) => {
			function recursiveRequest(obj, offset) {
				fetch(
					`https://api.mangadex.org/chapter?limit=100&offset=${offset}&manga=${mangaID}&translatedLanguage[]=en&order[chapter]=desc`
				)
					.then((res) => res.json())
					.then((newData) => {
						if (obj.data.length >= obj.total) {
							setChapterData(oldData);
						} else {
							let combinedData = [...obj.data, ...newData.data];
							let newObj = obj;
							newObj.data = combinedData;

							recursiveRequest(newObj, offset + 100);
						}
					});
			}
			recursiveRequest(oldData, 100); // 100 is the limit per request so i use it as offset
		});
	}, [mangaID]);

	async function chapterHandler(e, chapterID) {
		const chapterRes = await fetch(
			`https://api.mangadex.org/chapter/${chapterID}`
		);
		const res = await fetch(
			`https://api.mangadex.org/at-home/server/${chapterID}`
		);
		const { baseUrl } = await res.json();
		const { hash, data } = (await chapterRes.json()).data.attributes;
		const imgData = data.map((item) => `${baseUrl}/data/${hash}/${item}`);

		setChapterImage(imgData);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		chapterContainer.current.style.display = "none";
	}

	function closeHandler() {
		setChapterImage(null);
		chapterContainer.current.style.display = "block";
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	return (
		<div style={{ maxWidth: "1366px", margin: "0 auto" }}>
			{mangaID
				? data && (
						<div className={container}>
							<div>
								<div className={header}>
									<Cover
										mangaID={mangaID}
										coverID={
											data.mangaData.data[0].relationships.filter(
												(val) => val.type === "cover_art"
											)[0].id
										}
										style={{ width: "108px", height: "160px" }}
									/>
									<div>
										<p className={manga_title}>
											{
												data.mangaData.data[0].attributes.title[
													Object.keys(
														data.mangaData.data[0].attributes.title
													)[0]
												]
											}
										</p>
										{data.authorData && (
											<p>{data.authorData.data.attributes.name}</p>
										)}
									</div>
								</div>
								<div style={{ margin: "0 1em" }}>
									<p style={{ marginTop: "0.3em" }}>
										{
											data.mangaData.data[0].attributes.description[
												Object.keys(
													data.mangaData.data[0].attributes.description
												)[0]
											]
										}
									</p>
									<div
										style={{
											margin: "1em 0",
											overflowX: "auto",
											display: "flex",
										}}
									>
										{data.tags.map((val, i) => {
											return (
												<Tag
													key={i}
													name={
														val.attributes.name[
															Object.keys(val.attributes.name)[0]
														]
													}
												/>
											);
										})}
									</div>
								</div>
							</div>
							{chapterData ? (
								<div style={{ margin: "0.6em 0" }} ref={chapterContainer}>
									<h2 style={{ padding: "0 1rem" }}>
										{chapterData.total} Chapter
									</h2>
									{chapterData.data.map((val, i) => {
										return (
											<Chapter
												key={i}
												chapterID={val.id}
												volume={val.attributes.volume}
												chapter={val.attributes.chapter}
												title={val.attributes.title}
												date={val.attributes.publishAt}
												scanlationID={
													val.relationships.filter(
														(val) => val.type === "scanlation_group"
													)[0]
												}
												onClick={chapterHandler}
											/>
										);
									})}
								</div>
							) : (
								"Loading..."
							)}
						</div>
				  )
				: "Whatcha lookin for?"}
			{chapterImage && (
				<div className={abso}>
					<TransformWrapper panning={{ disabled: true }}>
						<TransformComponent wrapperClass={chapter_container}>
							{chapterImage.map((url, i) => {
								return <img src={url} alt="" key={i} />;
							})}
						</TransformComponent>
					</TransformWrapper>
					<button className={closeButton} onClick={closeHandler}>
						Close
					</button>
				</div>
			)}
		</div>
	);
}

export default Manga;
