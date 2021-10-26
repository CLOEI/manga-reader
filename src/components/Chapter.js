import { format } from 'date-fns';

const Chapter = ({ volume, chapter, title, scanlation, date }) => {
  return (
    <div className="chapter-container">
      <p>
        {volume
          ? title
            ? `Vol.${volume} Ch.${chapter} - ${title}`
            : `Vol.${volume} Ch.${chapter}`
          : title
          ? `Ch.${chapter} - ${title}`
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
