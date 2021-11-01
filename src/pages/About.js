import Layout from '../components/Layout';
import Header from '../components/Header';
import LanIcon from '../../static/assets/svg/language.svg';
import TrashIcon from '../../static/assets/svg/trash.svg';
import SunIcon from '../../static/assets/svg/sun.svg';
import MoonIcon from '../../static/assets/svg/moon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../redux/actions';

const About = () => {
  const { darkmode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkmode));
  };

  return (
    <Layout>
      <Header style={{ boxShadow: 'unset' }}>
        <h1>About</h1>
      </Header>
      <div className="about-container">
        <div className="about-header">
          <h2>Manga</h2>
        </div>
        <div className="about-option">
          <div>
            <LanIcon width={25} height={25} />
            <div>
              <p>Manga Language: EN</p>
              <p>Requested manga chapter language</p>
            </div>
          </div>
          <div>
            <TrashIcon />
            <div>
              <p>Delete Library</p>
              <p>WARNING: This will remove all manga from library</p>
            </div>
          </div>
          <div onClick={toggleDarkMode}>
            {darkmode ? <MoonIcon /> : <SunIcon />}
            <p>Toggle mode</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
