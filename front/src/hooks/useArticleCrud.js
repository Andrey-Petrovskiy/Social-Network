import useApi from './useApi';

export default function useArticleCrud() {
  const { callApi } = useApi();

  const getAllArticlesRequest = async ({ pageParam = 0 }) => {
    const params = { params: { limit: 10, page: pageParam } };
    const data = await callApi(`/articles`, 'get', params);

    const nextPage =
      (pageParam + 1) * params.params.limit < data.meta.total[0].count ? pageParam + 1 : null;

    return { data, nextPage };
  };

  const getArticleByIdRequest = (articleId) => {
    return callApi(`/articles/${articleId}`);
  };

  const createArticleRequest = (formData) => {
    return callApi('/articles', 'post', formData);
  };

  const updateArticleRequest = ({ articleId, formData }) => {
    return callApi(`/articles/${articleId}`, 'put', formData);
  };

  const deleteArticleRequest = (articleId) => {
    return callApi(`/articles/${articleId}`, 'delete');
  };

  return {
    getAllArticlesRequest,
    getArticleByIdRequest,
    createArticleRequest,
    updateArticleRequest,
    deleteArticleRequest,
  };
}
