import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';

export default function useMangaData(id) {
  const [data, setData] = useState({
    mangaData: null,
    coverURL: '',
    tags: [],
    author: '',
    chapterList: [],
  });

  useEffect(() => {
    if (id == null) return;
    const source = CancelToken.source();

    async function getData() {
      try {
        const manga = await axios
          .get(`/api/manga?ids[]=${id}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => data);

        const coverID = manga.data[0].relationships.filter(
          (val) => val.type === 'cover_art'
        )[0].id;
        const authorID = manga.data[0].relationships.filter(
          (val) => val.type === 'author'
        )[0].id;

        const author = await axios
          .get(`/api/author/${authorID}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => data)
          .catch(() => '{}');
        const cover = await axios
          .get(`/api/cover/${coverID}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => data);
        const coverURL = `https://uploads.mangadex.org/covers/${manga.data[0].id}/${cover.data.attributes.fileName}.256.jpg`;

        const tags = manga.data[0].attributes.tags.map(
          (val) => val.attributes.name[Object.keys(val.attributes.name)[0]]
        );

        let chapterList = await axios
          .get(
            `/api/chapter?manga=${id}&translatedLanguage[]=en&limit=100&order[chapter]=desc`,
            {
              cancelToken: source.token,
            }
          )
          .then(({ data }) => data);

        async function recursiveRequest(obj, offset) {
          const newData = await axios
            .get(
              `/api/chapter?limit=100&offset=${offset}&manga=${id}&translatedLanguage[]=en&order[chapter]=desc`,
              {
                cancelToken: source.token,
              }
            )
            .then(({ data }) => data);

          if (obj.data.length >= obj.total) {
            return;
          } else {
            let combinedData = [...obj.data, ...newData.data];
            let newObj = obj;
            newObj.data = combinedData;

            await recursiveRequest(newObj, offset + 100);
          }
        }

        await recursiveRequest(chapterList, 100);

        setData({
          mangaData: manga,
          coverURL,
          tags,
          author,
          chapterList,
        });
      } catch (error) {
        if (axios.isCancel(error)) return;
      }
    }
    getData();

    return () => source.cancel();
  }, [id]);

  return data;
}
