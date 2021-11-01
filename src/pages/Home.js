import Layout from '../components/Layout';
import Header from '../components/Header';
import Manga from '../components/Manga';
import { Link } from 'react-router-dom';

const Home = () => {
  const data = JSON.parse(localStorage.getItem('fav'));

  const isEmpty = (obj) => {
    if (obj == null) return true;
    if (!obj.mangas) return true;
    for (let key in obj.mangas) {
      if (obj.mangas.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  console.log(data);

  return (
    <Layout>
      <Header>
        <h1>Library</h1>
      </Header>
      <div className="home-container">
        {data?.mangas &&
          Object.keys(data.mangas).length > 0 &&
          Object.values(data.mangas).map(({ id, title, coverFileName }, i) => {
            return (
              <Link key={i} to={`/manga?id=${id}`} style={{ width: '100%' }}>
                <Manga id={id} title={title} coverFileName={coverFileName} />
              </Link>
            );
          })}
      </div>
      {isEmpty(data) && (
        <div className="loading">
          <h2>(ᗒᗣᗕ)՞</h2>
          <p>None in your favourite</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
