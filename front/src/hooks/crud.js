import { apiClient } from '../config/axios';

export const getArticles = async () => await apiClient.get('/articles');
