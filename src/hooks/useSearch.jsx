import { useState, useEffect } from 'react';
import axios, { CancelToken } from 'axios';

export default function useSearch(name, data) {
  const [favMangas, setFavMangas] = useState(null);

  useEffect(() => {
    let cancel = () => {};
    if (data.length > 0) {
      const params = new URLSearchParams();
      for (let item of data) {
        params.append('ids[]', item);
      }

      axios({
        url: `/api/manga`,
        method: 'GET',
        params: params,
        cancelToken: new CancelToken((c) => (cancel = c)),
        responseType: 'json',
      })
        .then(({ data }) => {
          const newData = data.data.filter((val) => {
            const title =
              val.attributes.title[Object.keys(val.attributes.title)[0]];
            return title.toLowerCase().includes(name.toLowerCase());
          });
          data.data = newData;
          setFavMangas(data);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }

    return () => cancel();
  }, [name, data]);

  return favMangas;
}
