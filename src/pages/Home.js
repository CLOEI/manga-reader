import Layout from '../components/Layout';
import Header from '../components/Header';
import Manga from '../components/Manga';
import { Link } from 'react-router-dom';
import style from '../style/pages/home.module.scss';

const Home = () => {
  const data = JSON.parse(localStorage.getItem('fav'));

  const isEmpty = (obj) => {
    if (obj == null) return true;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  return (
    <Layout>
      <Header>
        <h1>Library</h1>
      </Header>
      <div className={style.container}>
        {data?.mangas &&
          Object.keys(data.mangas).length > 0 &&
          Object.values(data.mangas).map(({ id, title, coverFileName }, i) => {
            return (
              <Link key={id} to={`/manga?id=${id}`} style={{ width: '100%' }}>
                <Manga id={id} title={title} coverFileName={coverFileName} />
              </Link>
            );
          })}
      </div>
      {isEmpty(data?.mangas) && (
        <div className={style.loading}>
          <h2>(ᗒᗣᗕ)՞</h2>
          <p>None in your favourite</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
