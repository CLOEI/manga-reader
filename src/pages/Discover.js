import { useCallback, useEffect, useRef, useState } from 'react';
import { getMangaList } from '../API';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Manga from '../components/Manga';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchIcon from '../../static/assets/svg/search.svg';
import style from '../style/pages/discover.module.scss';

const Discover = () => {
  const [mangas, setMangas] = useState({});
  const inputElem = useRef();

  const debounce = (func, delay) => {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    const params = new URLSearchParams();
    const source = axios.CancelToken.source();

    params.append('order[createdAt]', 'desc');
    params.append('limit', '100');
    params.append('includes[]', 'cover_art');

    getMangaList(source.token, params).then((data) => setMangas(data));

    return () => {
      source.cancel();
      setMangas({});
    };
  }, []);

  const toggleSearch = () => {
    inputElem.current.classList.toggle('active');
  };

  const debouncedSearch = useCallback(
    debounce((e) => {
      const params = new URLSearchParams();
      params.append('title', e.target.value);
      params.append('limit', '100');
      params.append('includes[]', 'cover_art');

      getMangaList(null, params).then((data) => data && setMangas(data));
    }, 500),
    []
  );

  return (
    <Layout>
      <Header>
        <h1>Discover</h1>
        <div className="search-container">
          <input type="text" ref={inputElem} onChange={debouncedSearch} />
          <SearchIcon onClick={toggleSearch} />
        </div>
      </Header>
      <div className={style.container}>
        {mangas != null &&
          Object.values(mangas).map(({ id, shortTitle, coverFileName }, i) => {
            return (
              <Link key={i} to={`/manga?id=${id}`} style={{ width: '100%' }}>
                <Manga
                  id={id}
                  title={shortTitle}
                  coverFileName={coverFileName}
                />
              </Link>
            );
          })}
      </div>
      {!Object.keys(mangas).length > 0 && (
        <div className={style.loading}>
          <h2>o(≧▽≦)o</h2>
          <p>Loading...</p>
        </div>
      )}
    </Layout>
  );
};

export default Discover;
