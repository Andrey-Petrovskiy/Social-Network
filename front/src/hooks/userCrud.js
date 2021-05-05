import useApi from './useApi';

export default function UserRequests() {
  const { callApi } = useApi();

  const getUserByIdRequest = async (id) => {
    return callApi(`/users/${id}`);
  };

  const updateUserRequest = async ({ id, formData }) => {
    return callApi(`/users/${id}`, 'put', formData);
  };

  const updateAvatarRequest = async ({ id, file }) => {
    return callApi(`/users/${id}/avatar`, 'put', file);
  };

  const getUserAvatarRequest = async (id) => {
    return callApi(`/users/${id}/avatar`);
  };

  return {
    getUserByIdRequest,
    updateUserRequest,
    updateAvatarRequest,
    getUserAvatarRequest,
  };
}
