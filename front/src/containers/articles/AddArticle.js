import React, { useCallback } from 'react';
import AddArticle from '../../components/AddArticle';
import { createArticleRequest, updateArticleRequest, getArticleById } from './hooks/crud';
import { useQuery, useMutation } from 'react-query';

function AddArticleContainer({ props }) {
  const articleId = props.match.params.id;

  const { data } = useQuery(['articles', articleId], () => getArticleById(articleId), {
    enabled: Boolean(articleId),
  });

  const article = data?.data.article || { title: '', text: '', visible_to: 'all' };

  const { mutate: createArticle } = useMutation(createArticleRequest);
  const { mutate: updateArticle } = useMutation(updateArticleRequest);

  const onSubmitCreate = useCallback(
    async (formData) => {
      try {
        await createArticle({ formData });
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
