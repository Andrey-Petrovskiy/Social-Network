import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import AddArticle from '../../components/AddArticle';
import ArticleRequests from '../../hooks/articleCrud';
import useAuth from '../../hooks/useAuth';

function AddArticleContainer({ props }) {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const articleId = props.match.params.id;

  const { getArticleByIdRequest, createArticleRequest, updateArticleRequest } = ArticleRequests();

  const { data } = useQuery(['articles', articleId], () => getArticleByIdRequest(articleId), {
    enabled: Boolean(articleId),
  });

  const article = data?.article || { title: '', text: '', visible_to: 'all' };

  const { mutate: createArticle } = useMutation(createArticleRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      history.push('/');
    },
  });
  const { mutate: updateArticle } = useMutation(updateArticleRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      history.push('/');
    },
  });

  const onSubmitCreate = useCallback(
    async (formData) => {
      try {
        const data = { ...formData, user_id: user.id };
        await createArticle(data);
      } catch (e) {
        console.log(e);
      }
    },
    [createArticle]
  );

  const onSubmitEdit = useCallback(
    async (formData) => {
      try {
        await updateArticle({ articleId, formData });
      } catch (e) {
        console.log(e);
      }
    },
    [updateArticle, articleId]
  );

  return article.id ? (
    <AddArticle article={article} onSubmit={onSubmitEdit} />
  ) : (
    <AddArticle article={article} onSubmit={onSubmitCreate} />
  );
}

export default AddArticleContainer;
