import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { getAllArticles } from './hooks/crud';
import ArticleList from '../../components/ArticleList';

function ArticleListContainer() {
  const {
    data: response,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('articles', getAllArticles, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pageData = response?.pages || [];

  return (
    <ArticleList
      pageData={pageData}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

export default ArticleListContainer;