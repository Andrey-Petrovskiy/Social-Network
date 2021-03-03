import React, { useState, useCallback } from 'react';
import AddArticle from '../../components/content/add-article/add-article';
import { createArticleRequest, updateArticleRequest, getArticleById } from './hooks/crud';
import { useQuery, useMutation } from 'react-query';

function AddArticleContainer({ props }) {
  const [display, setDisplay] = useState(false);
  const toggleDropdown = (event) => {
    event.preventDefault();
    setDisplay(!display);
  };

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
        console.log(articleId);
        console.log(formData);
        await updateArticle({ articleId, formData });
      } catch (e) {
        console.log(e);
      }
    },
    [updateArticle, articleId]
  );

  return article.id ? (
    <AddArticle
      display={display}
      article={article}
      toggleDropdown={toggleDropdown}
      onSubmit={onSubmitEdit}
    />
  ) : (
    <AddArticle
      display={display}
      article={article}
      toggleDropdown={toggleDropdown}
      onSubmit={onSubmitCreate}
    />
  );
}

export default AddArticleContainer;
