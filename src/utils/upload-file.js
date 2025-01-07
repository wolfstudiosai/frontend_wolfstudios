import { api } from './api';

export const uploadFileAsync = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/file/upload', formData);
  return response.json();
};
