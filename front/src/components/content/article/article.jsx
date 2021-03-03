import './article.css';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Article({ articleData }) {
  const { id, title, text } = articleData;
  return (
    <div>
      <h3>{title}</h3>
      <h4>{text}</h4>
      <Link to={`/edit-article/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

Article.propTypes = {
  articleData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default Article;
