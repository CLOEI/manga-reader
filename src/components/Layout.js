import Navbar from './Navbar';
import style from '../style/components/layout.module.scss';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const dark = localStorage.getItem('darkToggled') === 'true';

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className={style.container}>
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
