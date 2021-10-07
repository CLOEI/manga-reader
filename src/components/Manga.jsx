import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios, { CancelToken } from 'axios';
import classes from '../styles/Manga.module.css';

function Manga({ mangaID, coverID, title }) {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    let cancel;
    axios({
      url: `/api/cover/${coverID}`,
      method: 'get',
      cancelToken: new CancelToken((c) => (cancel = c)),
      responseType: 'json',
    })
      .then(({ data }) => {
        setCover(data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancel();
  }, [coverID]);

  return (
    <Link to={`/manga?id=${mangaID}`} className={classes.container}>
      <LazyLoadImage
        src={
          cover &&
          `https://uploads.mangadex.org/covers/${mangaID}/${cover.data.attributes.fileName}.256.jpg`
        }
        width="158px"
        height="210px"
        effect="opacity"
      />
      <p>{title}</p>
    </Link>
  );
}

export default Manga;
