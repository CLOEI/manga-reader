import { useLocation, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import FileIcon from '../../static/assets/svg/file.svg';
import SearchIcon from '../../static/assets/svg/search.svg';
import DotIcon from '../../static/assets/svg/dot.svg';
import style from '../style/components/navbar.module.scss';

const Navbar = () => {
  const path = useLocation().pathname;
  const elem = useRef();
  let prevScrollY = window.scrollY;

  useEffect(() => {
    window.onscroll = () => {
      if (elem.current == null) return;
      const currentScrollY = window.scrollY;
      if (prevScrollY > currentScrollY) {
        elem.current.style.bottom = '0';
      } else {
        elem.current.style.bottom = '-60px';
      }
      prevScrollY = currentScrollY;
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <>
      {!path.includes('manga') && (
        <div className={style.container} ref={elem}>
          <Link to="/">
            <div>
              <FileIcon color={path == '/' ? '#ff3860' : 'var(--text-color)'} />
            </div>
          </Link>
          <Link to="/discover">
            <div>
              <SearchIcon
                color={path == '/discover' ? '#ff3860' : 'var(--text-color)'}
              />
            </div>
          </Link>
          <Link to="/about">
            <div>
              <DotIcon
                color={path == '/about' ? '#ff3860' : 'var(--text-color)'}
              />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
