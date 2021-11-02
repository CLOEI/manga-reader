import React from 'react';
import style from '../style/components/tag.module.scss';

const Tag = ({ name }) => {
  return (
    <div className={style.container}>
      <p>{name}</p>
    </div>
  );
};

export default Tag;
