import { useLocation, Link } from 'react-router-dom';
import FileIcon from '../../static/assets/svg/file.svg';
import SearchIcon from '../../static/assets/svg/search.svg';
import DotIcon from '../../static/assets/svg/dot.svg';
import { useEffect, useRef } from 'react';

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
        <div className="navbar-container" ref={elem}>
          <Link to="/">
            <div>
              <FileIcon color={path == '/' ? '#ff3860' : 'initial'} />
            </div>
          </Link>
          <Link to="/discover">
            <div>
              <SearchIcon color={path == '/discover' ? '#ff3860' : 'initial'} />
            </div>
          </Link>
          <Link to="/about">
            <div>
              <DotIcon color={path == '/about' ? '#ff3860' : 'initial'} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
