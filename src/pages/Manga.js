import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getMangaData, getChapterData } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { delFavData, setFavState } from '../redux/actions';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LeftIcon from '../../static/assets/svg/left.svg';
import HearthIcon from '../../static/assets/svg/hearth.svg';
import Tag from '../components/Tag';
import Chapter from '../components/Chapter';
import axios from 'axios';
import Readmore from '../components/Readmore';
import style from '../style/pages/manga.module.scss';

const Manga = () => {
  const [data, setData] = useState(null);
  const id = useQuery().get('id');
  const history = useHistory();
  const dispatch = useDispatch();
  const { favourite } = useSelector((state) => state);

  useEffect(() => {
    if (id == null || !id.length > 0) return;
    const source = axios.CancelToken.source();
    getMangaData(source.token, id).then((res) =>
      setData((pre) => ({
        ...pre,
        ...res,
        coverURL: `https://uploads.mangadex.org/covers/${id}/${res?.coverFileName}.256.jpg`,
      }))
    );

    getChapterData(source.token, id).then((res) =>
      setData((pre) => ({ ...pre, chapterData: res }))
    );

    return () => {
      source.cancel();
      setData(null);
    };
  }, []);

  const addFavHandler = () => {
    if (data == null) return;
    if (favourite?.mangas?.hasOwnProperty(id)) {
      dispatch(delFavData(id));
    } else {
      dispatch(
        setFavState({
          id,
          title: data.shortTitle,
          coverFileName: data.coverFileName,
        })
      );
    }
  };

  return (
    <Layout>
      <Header>
        <LeftIcon onClick={() => history.goBack()} />
      </Header>
      <div className={style.container}>
        <div
          className={style.background}
          style={{ backgroundImage: `url(${data?.coverURL})` }}
        ></div>
        <div className={style.cover}>
          <div>
            <img src={data?.coverURL} />
          </div>
        </div>
        <div className={style.info}>
          <p>{data?.title || 'Loading'}</p>
          <p>{data?.author || 'Unknown'}</p>
        </div>
        <div className={style.add} onClick={addFavHandler}>
          <HearthIcon
            style={{
              fill: `${favourite?.mangas?.hasOwnProperty(id) ? 'red' : ''}`,
            }}
          />
          <p>Add to library</p>
        </div>
        <div className={style.data}>
          <Readmore>{data?.description || ''}</Readmore>
          <div className={style.tags}>
            {data?.tags != null &&
              data.tags.map((tag, i) => {
                return <Tag name={tag} key={i} />;
              })}
          </div>
          <p>{`${data?.chapterData?.total || 0} Chapter`}</p>
          <div className={style.chapters}>
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
            {data?.chapterData?.chapterList &&
              !data.chapterData.chapterList.length > 0 && (
                <p>Not available for current language</p>
              )}
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
