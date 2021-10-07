import React from 'react';
import { Link } from 'react-router-dom';
import { footer, container } from '../styles/Home.module.css';
import { ReactComponent as DotsIcon } from '../assets/dots.svg';

function Layout({ children }) {
  return (
    <div className={container}>
      {children}
      <div
        className={footer}
        style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div>
            <p>Library</p>
          </div>
        </Link>
        <Link
          to="/discover"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <div>
            <p>Discover</p>
          </div>
        </Link>
        <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div>
            <DotsIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Layout;
