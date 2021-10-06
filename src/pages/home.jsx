import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import Layout from '../components/Layout';
import classes from '../styles/Home.module.css';
import styled from 'styled-components';
import Manga from '../components/Manga';
import useSearch from '../hooks/useSearch';

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
	const [name, setName] = useState('');
	const favManga = useSearch(
		name,
		JSON.parse(localStorage.getItem('favMangas'))
	);

	function searchHandler(e) {
		setName(e.target.value);
	}

	return (
		<Layout>
			<div className={classes.header}>
				<h1>Library</h1>
				<div className={classes.search}>
					<form onSubmit={(e) => e.preventDefault()}>
						<input
							type="text"
							name="title"
							placeholder="Input name here"
							style={{ display: `${searchToggled ? 'inline-block' : 'none'}` }}
							onChange={searchHandler}
						/>
					</form>
					<SearchIcon onClick={() => setSearchToggled(!searchToggled)} />
				</div>
			</div>
			<main>
				<div>
					{favManga ? (
						<div className={classes.fav_container}>
							{favManga.data.map((item, i) => {
								const coverID = item.relationships.filter(
									(val) => val.type === 'cover_art'
								)[0].id;
								return (
									<Manga
										mangaID={item.id}
										coverID={coverID}
										title={item.attributes.title[Object.keys(item.attributes.title)[0]]}
										key={i}
									/>
								);
							})}
						</div>
					) : JSON.parse(localStorage.getItem('favMangas'))?.length > 0 ? (
						<NotFound>
							<h2>╰(°∇≦*)╮</h2>
							<p>Adding ur fav!</p>
						</NotFound>
					) : (
						<NotFound>
							<h2>( ˘︹˘ )</h2>
							<p>No favourites yet..</p>
						</NotFound>
					)}
				</div>
			</main>
		</Layout>
	);
}

export default Home;
