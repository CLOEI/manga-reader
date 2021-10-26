import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDiscoverState } from '../redux/actions';
import { getMangaList } from '../API';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Manga from '../components/Manga';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchIcon from '../../static/assets/svg/search.svg';

const Discover = () => {
  const { discovery } = useSelector((state) => state);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const inputElem = useRef();

  useEffect(() => {
    if (title.length > 0) return;
    const source = axios.CancelToken.source();
    getMangaList(source.token, {
      'order[createdAt]': 'desc',
      limit: 100,
    }).then((data) => data && dispatch(setDiscoverState(data)));

    return () => {
      source.cancel();
    };
  }, [title]);

  useEffect(() => {
    if (title.length < 1) return;
    const source = axios.CancelToken.source();
    getMangaList(source.token, {
      title,
      limit: 100,
    }).then((data) => data && dispatch(setDiscoverState(data)));

    return () => {
      source.cancel();
    };
  }, [title]);

  const toggleSearch = () => {
    inputElem.current.classList.toggle('active');
  };

  const searchHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Layout>
      <Header>
        <h1>Discover</h1>
        <div className="search-container">
          <input type="text" ref={inputElem} onChange={searchHandler} />
          <SearchIcon onClick={toggleSearch} />
        </div>
      </Header>
      <div className="discover-container">
        {discovery?.mangas != null &&
          Object.values(discovery.mangas).map(
            ({ id, shortTitle, coverFileName }, i) => {
              return (
                <Link key={i} to={`/manga?id=${id}`} style={{ width: '100%' }}>
                  <Manga
                    id={id}
                    title={shortTitle}
                    coverFileName={coverFileName}
                  />
                </Link>
              );
            }
          )}
        {discovery?.mangas == null && (
          <div className="loading">
            <h2>o(≧▽≦)o</h2>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
