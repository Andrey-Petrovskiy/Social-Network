import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import Article from '../../components/Article/Article';
import ArticleRequests from '../../hooks/articleCrud';

function ArticleContainer({ articleData }) {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { deleteArticleRequest } = ArticleRequests();
  const { id } = articleData;

  const { mutate: deleteArticle } = useMutation(deleteArticleRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      history.push('/');
    },
  });

  const onClickDelete = useCallback(async () => {
    try {
      await deleteArticle(id);
    } catch (e) {
      console.log(e);
    }
  }, [deleteArticle]);

  return <Article articleData={articleData} onClickDelete={onClickDelete} />;
}

export default ArticleContainer;
