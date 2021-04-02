import { apiClient } from '../../../config/axios';

export const getUserById = async (id) => {
  return apiClient.get(`/users/${id}`);
};

export const updateUserRequest = async ({ id, formData }) => {
  return apiClient.put(`/users/${id}`, formData);
};

export const updateAvatarRequest = async ({ id, file }) => {
  return apiClient.put(`/users/${id}/avatar`, file);
};

export const getUserAvatar = async (id) => {
  return apiClient.get(`/users/${id}/avatar`);
};
