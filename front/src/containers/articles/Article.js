import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import Article from '../../components/Article/Article';
import useArticleCrud from '../../hooks/useArticleCrud';
import useUserCrud from '../../hooks/useUserCrud';

function ArticleContainer({ articleData }) {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { deleteArticleRequest } = useArticleCrud();
  const { getUserByIdRequest } = useUserCrud();

  const { id: articleId, user_id } = articleData;

  const { data } = useQuery(['users', user_id], () => getUserByIdRequest(user_id), {
    enabled: Boolean(user_id),
  });

  const articleAuthor = data?.data.user || { name: '', avatar: '' };

  const { mutate: deleteArticle } = useMutation(deleteArticleRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      history.push('/');
    },
  });

  const onClickDelete = useCallback(async () => {
    try {
      await deleteArticle(articleId);
    } catch (e) {
      console.log(e);
    }
  }, [deleteArticle, articleId]);

  return (
    <Article
      articleData={articleData}
      onClickDelete={onClickDelete}
      articleAuthor={articleAuthor}
    />
  );
}

export default ArticleContainer;
