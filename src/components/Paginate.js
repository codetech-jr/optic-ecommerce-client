// client/src/components/Paginate.js
import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '' }) => {
  if (pages <= 1) return null; // No mostrar si solo hay una página

  return (
    <div className="pagination">
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          className={x + 1 === page ? 'active' : ''}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default Paginate;
