import { format } from 'date-fns';
import style from '../style/components/chapter.module.scss';

const Chapter = ({ volume, chapter, title, scanlation, date }) => {
  return (
    <div className={style.container}>
      <p>
        {volume
          ? title
            ? `Vol.${volume} Ch.${chapter} - ${title}`
            : `Vol.${volume} Ch.${chapter}`
          : title
          ? `Ch.${chapter || 0} - ${title}`
          : `Ch.${chapter}`}
      </p>
      <p>
        {scanlation
          ? `${format(new Date(date), 'dd-MM-yy')} • ${scanlation}`
          : `${format(new Date(date), 'dd-MM-yy')}`}
      </p>
    </div>
  );
};

export default Chapter;
