import React, { useState, useEffect } from 'react';
import { getArticles } from '../hooks/crud';
import Articles from '../components/content/articles/articles';

function ArticlesContainer() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getArticles();
      setArticles(data.data.articles);
    };
    getData();
  }, []);

  return <Articles articles={articles} />;
}

export default ArticlesContainer;
