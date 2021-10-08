import React from 'react';
import { loader } from '../styles/Loader.module.css';

function Loader() {
  return (
    <div className={loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
