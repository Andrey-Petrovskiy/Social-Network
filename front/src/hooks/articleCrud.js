import useApi from './useApi';

export default function ArticleRequests() {
  const { callApi } = useApi();

  const getAllArticlesRequest = async ({ pageParam = 0 }) => {
    const params = { params: { limit: 10, page: pageParam } };
    const data = await callApi(`/articles`, 'get', params);

    const nextPage =
      (pageParam + 1) * params.params.limit < data.meta.total[0].count ? pageParam + 1 : null;

    return { data, nextPage };
  };

  const getArticleByIdRequest = async (id) => {
    return callApi(`/articles/${id}`);
  };

  const createArticleRequest = async (formData) => {
    return callApi('/articles', 'post', formData);
  };

  const updateArticleRequest = async ({ articleId, formData }) => {
    return callApi(`/articles/${articleId}`, 'put', formData);
  };

  const deleteArticleRequest = async (id) => {
    return callApi(`/articles/${id}`, 'delete');
  };

  return {
    getAllArticlesRequest,
    getArticleByIdRequest,
    createArticleRequest,
    updateArticleRequest,
    deleteArticleRequest,
  };
}
