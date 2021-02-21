import React from 'react';
import PropTypes from 'prop-types';
import './articles.css';

const Articles = ({ articles }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Articles</h1>
      <div>
        {articles.map(({ id, title, text, created_at }) => (
          <div key={id} className="article">
            <div style={{ textAlign: 'center' }}>{title}</div>
            {text}
            <div>Posted at {created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
      created_at: PropTypes.string,
    })
  ),
};

export default Articles;
