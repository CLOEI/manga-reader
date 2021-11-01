import Layout from '../components/Layout';
import Header from '../components/Header';
import Manga from '../components/Manga';
import { Link } from 'react-router-dom';

const Home = () => {
  const data = JSON.parse(localStorage.getItem('fav'));

  const isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return false;
  };

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
      {isEmpty(data) ||
        (!Object.keys(data?.mangas).length > 0 && (
          <div className="loading">
            <h2>(ᗒᗣᗕ)՞</h2>
            <p>None in your favourite</p>
          </div>
        ))}
    </Layout>
  );
};

export default Home;
