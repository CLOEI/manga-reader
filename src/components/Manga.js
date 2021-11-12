import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LazyLoad from 'react-lazyload';
import style from '../style/components/manga.module.scss';

const Manga = ({ id, title, coverFileName }) => {
  const [url, setURL] = useState('');

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

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
    <motion.div variants={variants}>
      <LazyLoad
        classNamePrefix="manga"
        style={{
          backgroundImage: `url(${url})`,
        }}
        placeholder={<Loading />}
      >
        {title.length > 0 && <p>{title}</p>}
      </LazyLoad>
    </motion.div>
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
