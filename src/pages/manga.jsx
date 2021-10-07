import { useState, useRef, useCallback } from 'react';
import { container, header } from '../styles/Home.module.css';
import { ReactComponent as ArrowIcon } from '../assets/arrowleft.svg';
import { ReactComponent as LeftIcon } from '../assets/left.svg';
import { ReactComponent as RightIcon } from '../assets/right.svg';
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import useMangaData from '../hooks/useMangaData';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Tag from '../components/Tag';
import classes from '../styles/MangaPage.module.css';
import Chapter from '../components/Chapter';

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
  const id = useQuery().get('id');
  const { mangaData, coverURL, tags, author, chapterList } = useMangaData(id);
  const [favClick, setFavClick] = useState(false);
  const [chapterData, setChapterData] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty('transform', value);
    }
  }, []);

  async function chapterHandler(e, id) {
    const quality = localStorage.getItem('quality') || 'data';
    const { baseUrl } = await fetch(`/api/at-home/server/${id}`).then((res) =>
      res.json()
    );
    const { data, hash } = await fetch(`/api/chapter/${id}`)
      .then((res) => res.json())
      .then((data) => {
        return {
          data: data.data.attributes[quality],
          hash: data.data.attributes.hash,
        };
      });
    // seems like sometime chapter data is empty.
    setChapterData(data.map((item) => `${baseUrl}/${quality}/${hash}/${item}`));
    window.scrollTo({
      top: 0,
    });
  }

  function favHandler() {
    const favMangas = JSON.parse(localStorage.getItem('favMangas'));
    if (favMangas.includes(id)) {
      localStorage.setItem(
        'favMangas',
        JSON.stringify(favMangas.filter((val) => val !== id))
      );
    } else {
      favMangas.push(id);
      localStorage.setItem('favMangas', JSON.stringify(favMangas));
    }

    setFavClick(!favClick);
  }

  function isFav(id) {
    const favMangas = JSON.parse(localStorage.getItem('favMangas'));
    return favMangas.includes(id);
  }

  function nextHandler() {
    if (currentNumber !== chapterData.length) {
      setCurrentNumber((pre) => pre + 1);
    }
  }

  function preHandler() {
    if (currentNumber !== 0) {
      setCurrentNumber((pre) => pre - 1);
    }
  }

  function closeChapter() {
    setChapterData(null);
    setCurrentNumber(0);
  }

  return (
    <div className={container}>
      <div className={header}>
        <Link to="/" style={{ color: 'inherit' }}>
          <ArrowIcon />
        </Link>
      </div>
      <main>
        {id ? (
          mangaData &&
          !chapterData && (
            <div>
              <div>
                <div className={classes.header}>
                  <div
                    className={classes.header_background}
                    style={{
                      backgroundImage: `url(${coverURL})`,
                      height: '200px',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: '0 10%',
                    }}
                  ></div>
                  <div className={classes.header_items}>
                    <img src={coverURL} alt="manga cover" />
                    <div>
                      <h2>
                        {
                          mangaData.data[0].attributes.title[
                            Object.keys(mangaData.data[0].attributes.title)[0]
                          ]
                        }
                      </h2>
                      <p>{author.data?.attributes.name}</p>
                    </div>
                  </div>
                </div>
                <div className={classes.info} style={{ margin: '1em 1em' }}>
                  <div style={{ padding: '1em 0' }}>
                    <div onClick={favHandler}>
                      <HeartIcon
                        style={{ fill: `${isFav(id) ? 'red' : ''}` }}
                      />
                      <p>Add to Library</p>
                    </div>
                  </div>
                  <p>
                    {
                      mangaData.data[0].attributes.description[
                        Object.keys(mangaData.data[0].attributes.description)[0]
                      ]
                    }
                  </p>
                  <div className={classes.tags_container}>
                    {tags.map((val, i) => {
                      return <Tag name={val} key={i} />;
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ padding: '0 1em 0.5em 1rem' }}>
                  {chapterList.total} Chapter
                </h3>
                {chapterList.data.map((val, i, arr) => {
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
                          (val) => val.type === 'scanlation_group'
                        )[0]
                      }
                      onClick={(e) => chapterHandler(e, val.id)}
                    />
                  );
                })}
              </div>
            </div>
          )
        ) : (
          <NotFound>
            <h2>~(˘▾˘~)</h2>
            <p>Seems like something went wrong!</p>
          </NotFound>
        )}

        {id && !mangaData && (
          <NotFound>
            <h2>彡໒(⊙ᴗ⊙)७彡</h2>
            <p>Loading...</p>
          </NotFound>
        )}
        {chapterData && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#121212',
              top: '0',
              right: '0',
              left: '0',
              bottom: '0',
              height: window.innerHeight,
            }}
          >
            <QuickPinchZoom onUpdate={onUpdate} draggableUnZoomed={false}>
              <img
                ref={imgRef}
                src={chapterData[currentNumber]}
                alt="manga"
                className={classes.manga}
              />
            </QuickPinchZoom>
            <div className={classes.chapter_info}>
              <LeftIcon onClick={nextHandler} />
              <p>
                {currentNumber + 1}/{chapterData.length}
              </p>
              <RightIcon onClick={preHandler} />
              <button onClick={closeChapter}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Manga;
