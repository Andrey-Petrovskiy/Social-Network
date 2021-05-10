import React from 'react';
import { useInfiniteQuery } from 'react-query';

import ArticleList from '../../components/ArticleList';
import useArticleCrud from '../../hooks/useArticleCrud';

function ArticleListContainer() {
  const { getAllArticlesRequest } = useArticleCrud();

  const {
    data: response,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('articles', getAllArticlesRequest, {
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
