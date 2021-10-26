import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getMangaData, getChapterData, getMangaCover } from '../API';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LeftIcon from '../../static/assets/svg/left.svg';
import HearthIcon from '../../static/assets/svg/hearth.svg';
import Tag from '../components/Tag';
import Chapter from '../components/Chapter';
import axios from 'axios';

const Manga = () => {
  const [data, setData] = useState(null);
  const id = useQuery().get('id');
  const history = useHistory();

  useEffect(() => {
    if (id == null || !id.length > 0) return;
    const source = axios.CancelToken.source();
    getMangaData(source.token, id).then((res) =>
      setData((pre) => ({
        ...pre,
        ...res,
        coverURL: `https://uploads.mangadex.org/covers/${id}/${res.coverFileName}.256.jpg`,
      }))
    );

    getChapterData(source.token, id).then((res) =>
      setData((pre) => ({ ...pre, chapterData: res }))
    );

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Layout>
      <Header>
        <LeftIcon onClick={() => history.goBack()} />
      </Header>
      <div className="manga-header">
        <div
          className="manga-header-background"
          style={{ backgroundImage: `url(${data?.coverURL})` }}
        ></div>
        <div className="manga-header-cover">
          <div>
            <img src={data?.coverURL} />
          </div>
        </div>
        <div className="manga-header-info">
          <p>{data?.title || 'Loading'}</p>
          <p>{data?.author || 'Unknown'}</p>
        </div>
        <div className="manga-header-add">
          <HearthIcon />
          <p>Add to library</p>
        </div>
        <div className="manga-header-data">
          <p>{data?.description || 'loading...'}</p>
          <div className="manga-header-data-tags">
            {data?.tags != null &&
              data.tags.map((tag, i) => {
                return <Tag name={tag} key={i} />;
              })}
          </div>
          <p>{`${data?.chapterData?.total || 0} Chapter`}</p>
          <div className="manga-header-data-chapters">
            {data?.chapterData?.chapterList != null &&
              data.chapterData.chapterList.map((chapter, i) => {
                return (
                  <Chapter
                    volume={chapter.volume}
                    chapter={chapter.chapter}
                    title={chapter.title}
                    scanlation={chapter.scanlationGroup}
                    date={chapter.publishAt}
                    key={i}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default Manga;
