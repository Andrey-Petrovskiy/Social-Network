import { apiClient } from '../../../config/axios';

export const getAllArticles = async ({ pageParam = 0 }) => {
  const params = { params: { limit: 10, page: pageParam } };

  const { data } = await apiClient.get(`/articles`, params);

  const nextPage =
    (pageParam + 1) * params.params.limit < data.meta.total[0].count ? pageParam + 1 : null;

  return { data, nextPage };
};

export const getArticleById = async (id) => {
  return apiClient.get(`/articles/${id}`);
};

export const createArticleRequest = async ({ formData }) => {
  const data = { ...formData, user_id: 28 };
  return apiClient.post('/articles', data);
};

export const updateArticleRequest = async ({ articleId, formData }) => {
  return apiClient.put(`/articles/${articleId}`, formData);
};
