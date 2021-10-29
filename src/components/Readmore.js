import { useState } from 'react';

const Readmore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      {text.length > 150 && (
        <span
          onClick={toggleReadMore}
          style={{ color: '#ff3860', cursor: 'pointer' }}
        >
          {isReadMore ? ' Read more' : ' Show less'}
        </span>
      )}
    </p>
  );
};

export default Readmore;
