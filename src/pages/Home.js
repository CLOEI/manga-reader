import Layout from '../components/Layout';
import Header from '../components/Header';
import Manga from '../components/Manga';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import style from '../style/pages/home.module.scss';

const Home = () => {
  const data = JSON.parse(localStorage.getItem('fav'));

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

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
      <motion.div
        className={style.container}
        variants={variants}
        initial="hidden"
        animate="show"
      >
        {data?.mangas &&
          Object.keys(data.mangas).length > 0 &&
          Object.values(data.mangas).map(({ id, title, coverFileName }, i) => {
            return (
              <Link key={id} to={`/manga?id=${id}`} style={{ width: '100%' }}>
                <Manga id={id} title={title} coverFileName={coverFileName} />
              </Link>
            );
          })}
      </motion.div>
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
