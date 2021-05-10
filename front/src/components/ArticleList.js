import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import ArticleContainer from '../containers/articles/Article';

function ArticleList({
  pageData,
  isFetching,
  isError,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}) {
  return (
    <div>
      {isFetching && !isFetchingNextPage && <div>Loading...</div>}
      {isError && <div>Couldn't load the data</div>}

      {!isFetching &&
        pageData.map(({ data: { data } }) =>
          data.map((article) => <ArticleContainer key={article.id} articleData={article} />)
        )}

      {hasNextPage && (
        <Button variant="outlined" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more {isFetchingNextPage && 'Loading more...'}
        </Button>
      )}
    </div>
  );
}

ArticleList.propTypes = {
  pageData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetchingNextPage: PropTypes.bool.isRequired,
  fetchNextPage: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
};

export default ArticleList;
