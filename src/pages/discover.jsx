import { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import Layout from '../components/Layout';
import Manga from '../components/Manga';
import classes from '../styles/Home.module.css';
import styled from 'styled-components';

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

function Discover() {
  const [searchToggled, setSearchToggled] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [mangaData, setMangaData] = useState(null);

  useEffect(() => {
    fetch(`/api/manga?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setMangaData(data);
        setisLoading(false);
      });
  }, []);

  async function searchHandler(e) {
    e.preventDefault();
    setisLoading(true);
    const data = await (
      await fetch(`/api/manga?title=${e.target.title.value}&limit=100`)
    ).json();
    setMangaData(data);
    setisLoading(false);
  }

  return (
    <Layout>
      <div className={classes.header}>
        <h1>Discover</h1>
        <div className={classes.search}>
          <form onSubmit={searchHandler}>
            <input
              type="text"
              name="title"
              placeholder="Input name here"
              style={{
                display: `${searchToggled ? 'inline-block' : 'none'}`,
              }}
            />
          </form>
          <SearchIcon onClick={() => setSearchToggled(!searchToggled)} />
        </div>
      </div>
      <main>
        {!isLoading && (
          <div className={classes.manga_container}>
            {mangaData.data.map((item, i) => {
              const coverID = item.relationships.filter(
                (val) => val.type === 'cover_art'
              )[0].id;
              return (
                <Manga
                  mangaID={item.id}
                  coverID={coverID}
                  title={
                    item.attributes.title[Object.keys(item.attributes.title)[0]]
                  }
                  key={item.id}
                />
              );
            })}
          </div>
        )}
        {isLoading && (
          <NotFound>
            <h2>ღゝ◡╹)ノ♡</h2>
            <p>Loading...</p>
          </NotFound>
        )}
      </main>
    </Layout>
  );
}

export default Discover;
