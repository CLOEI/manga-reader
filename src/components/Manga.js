import { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import style from '../style/components/manga.module.scss';

const Manga = ({ id, title, coverFileName }) => {
  const [url, setURL] = useState('');

  useEffect(() => {
    if (coverFileName == null) return;
    setURL(
      `https://uploads.mangadex.org/covers/${id}/${coverFileName}.256.jpg`
    );
    return () => {
      setURL('');
    };
  }, [id, coverFileName]);

  return (
    <LazyLoad
      classNamePrefix="manga"
      style={{
        backgroundImage: `url(${url})`,
      }}
      placeholder={<Loading />}
    >
      {title.length > 0 && <p>{title}</p>}
    </LazyLoad>
  );
};

const Loading = () => {
  return (
    <div className={style.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Manga;
