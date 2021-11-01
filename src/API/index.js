import axios from 'axios';

export const getMangaList = (cancelToken, params) => {
  return axios
    .get('/api/manga', {
      cancelToken: cancelToken,
      params: params,
      transformResponse: [
        (res) => {
          const { data } = JSON.parse(res);
          const newData = {};

          data.forEach((item) => {
            const id = item.id;
            const title =
              item.attributes.title[Object.keys(item.attributes.title)[0]];
            const coverFileName = item.relationships.filter(
              (item) => item.type === 'cover_art'
            )[0].attributes?.fileName;
            const shortTitle =
              title.length > 40 ? title.substr(0, 40) + '...' : title;

            newData[id] = {
              id,
              title,
              shortTitle,
              coverFileName,
            };
          });

          return newData;
        },
      ],
    })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) return;
    });
};

export const getMangaData = (cancelToken, mangaID) => {
  const params = new URLSearchParams();
  params.append('includes[]', 'cover_art');
  params.append('includes[]', 'author');

  return axios
    .get(`/api/manga/${mangaID}`, {
      cancelToken: cancelToken,
      params: params,
      transformResponse: [
        (res) => {
          const { data } = JSON.parse(res);

          const id = data.id;
          const title =
            data.attributes.title[Object.keys(data.attributes.title)[0]];
          const description =
            data.attributes.description[
              Object.keys(data.attributes.description)[0]
            ];
          const coverFileName = data.relationships.filter(
            (item) => item.type === 'cover_art'
          )[0].attributes.fileName;
          const author = data.relationships.filter(
            (item) => item.type === 'author'
          )[0].attributes.name;
          const shortTitle =
            title.length > 40 ? title.substr(0, 40) + '...' : title;
          const tags = data.attributes.tags.map(
            (item) => item.attributes.name[Object.keys(item.attributes.name)[0]]
          );

          return {
            id,
            title,
            shortTitle,
            description,
            author,
            tags,
            coverFileName,
          };
        },
      ],
    })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) return;
    });
};

export const getChapterData = (cancelToken, mangaID) => {
  return axios
    .get(`/api/chapter`, {
      cancelToken: cancelToken,
      params: {
        limit: '100',
        manga: mangaID,
        'includes[]': 'scanlation_group',
        'translatedLanguage[]': 'en',
        'order[chapter]': 'desc',
      },
      transformResponse: [
        (res) => {
          const data = JSON.parse(res);
          const total = data.total;
          const chapterList = data.data.map((item) => {
            const { chapter, volume, hash, data, publishAt, title } =
              item.attributes;
            const scanlationGroup = item.relationships.filter(
              (item) => item.type == 'scanlation_group'
            )[0].attributes.name;

            return {
              title,
              scanlationGroup,
              hash,
              publishAt,
              chapter,
              volume,
              data,
            };
          });
          return {
            total,
            chapterList,
          };
        },
      ],
    })
    .then((res) => {
      return new Promise((resolve, _) => {
        const data = (oldData, offset) => {
          if (oldData.chapterList.length === oldData.total) {
            return resolve(oldData);
          }
          return axios
            .get(`/api/chapter`, {
              cancelToken: cancelToken,
              params: {
                limit: '100',
                manga: mangaID,
                offset: offset,
                'includes[]': 'scanlation_group',
                'translatedLanguage[]': 'en',
                'order[chapter]': 'desc',
              },
              transformResponse: [
                (res) => {
                  const { data } = JSON.parse(res);
                  const chapterList = data.map((item) => {
                    const { chapter, volume, hash, data, publishAt, title } =
                      item.attributes;
                    const scanlationGroup = item.relationships.filter(
                      (item) => item.type == 'scanlation_group'
                    )[0]?.attributes.name;

                    return {
                      title,
                      scanlationGroup,
                      hash,
                      publishAt,
                      chapter,
                      volume,
                      data,
                    };
                  });

                  return chapterList;
                },
              ],
            })
            .then((res) => {
              const newData = {
                ...oldData,
                chapterList: oldData.chapterList.concat(res.data),
              };
              return data(newData, offset + 100);
            })
            .catch((err) => {
              if (axios.isCancel(err)) return;
            });
        };

        data(res.data, 100).then((res) => resolve(res));
      });
    })
    .catch((err) => {
      if (axios.isCancel(err)) return;
    });
};

export const getMangaCover = (cancelToken, mangaID, coverID) => {
  return axios
    .get(`/api/cover/${coverID}`, {
      cancelToken: cancelToken,
      transformResponse: [
        (res) => {
          const { data } = JSON.parse(res);
          const fileName = data.attributes.fileName;
          return fileName;
        },
      ],
    })
    .then(
      (res) =>
        `https://uploads.mangadex.org/covers/${mangaID}/${res.data}.256.jpg`
    )
    .catch((res) => {
      if (axios.isCancel(res)) return;
    });
};
