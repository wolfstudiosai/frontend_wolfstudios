import { api } from './api';

export const uploadFileAsync = async (file) => {
  const formData = new FormData();
  formData.append('files', file);
  const response = await api.post('/file/upload', formData);
  if (!response.data.success) return;
  return response.data.data;
};
