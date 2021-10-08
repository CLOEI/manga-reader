import React from 'react';
import Layout from '../components/Layout';
import classes from '../styles/Home.module.css';
import InstallPWA from '../components/InstallPWA';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { ReactComponent as DownloadIcon } from '../assets/download.svg';

function About() {
  function deleteStorage() {
    localStorage.setItem('favMangas', '[]');
  }

  return (
    <Layout>
      <div className={classes.header}>
        <h1>About</h1>
      </div>
      <main>
        <div className={classes.about_container}>
          <div>
            <h2>まんが</h2>
            <p>( Manga )</p>
          </div>
          <div>
            <div onClick={deleteStorage}>
              <TrashIcon />
              <p>Delete library</p>
            </div>
            <InstallPWA>
              <DownloadIcon />
              <p>Install</p>
            </InstallPWA>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default About;
