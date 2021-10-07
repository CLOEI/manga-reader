import { useState, useEffect } from 'react';
import { container } from '../styles/Chapter.module.css';
import { format } from 'date-fns';
import axios, { CancelToken } from 'axios';

function Chapter({
  volume,
  chapter,
  title,
  date,
  scanlationID,
  onClick,
  chapterID,
}) {
  const [scanlation, setScanlation] = useState(null);

  useEffect(() => {
    if (scanlationID === undefined) return;
    let cancel;

    axios({
      url: `/api/group/${scanlationID.id}`,
      method: 'GET',
      cancelToken: new CancelToken((c) => (cancel = c)),
      responseType: 'json',
    })
      .then(({ data }) => {
        setScanlation(data.data.attributes.name);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancel();
  }, [scanlationID]);

  return (
    <div className={container} onClick={(e) => onClick(e, chapterID)}>
      <p>
        {volume
          ? title
            ? `Vol.${volume} Ch.${chapter} - ${title}`
            : `Vol.${volume} Ch.${chapter}`
          : title
          ? `Ch.${chapter} - ${title}`
          : `Ch.${chapter}`}
      </p>
      <p>
        {scanlation
          ? `${format(new Date(date), 'dd-MM-yy')} • ${scanlation}`
          : `${format(new Date(date), 'dd-MM-yy')}`}
      </p>
    </div>
  );
}

export default Chapter;
