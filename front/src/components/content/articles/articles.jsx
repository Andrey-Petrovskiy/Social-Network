import React from 'react';
import { useParams } from 'react-router-dom';
import './articles.css';

const Articles = () => {
  console.log(useParams());

  return (
    <div className="articles">
      <h1>Articles</h1>
    </div>
  );
};

export default Articles;
