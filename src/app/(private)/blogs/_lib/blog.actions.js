import { toast } from 'sonner';

import { api, publicApi } from '/src/utils/api';

export const getBlogs = async (queryParams) => {
  try {
    const query = new URLSearchParams();
    if (queryParams.page) {
      query.append('page', queryParams.page);
    }
    if (queryParams.rowsPerPage) {
      query.append('size', queryParams.rowsPerPage);
    }
    if (queryParams.search) {
      query.append('search', queryParams.search);
    }
    const res = await api.get(`/users?${query.toString()}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.message)
    return { success: false, data: [], error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createBlog = async (data, isPublicRegistration = false) => {
  try {
    const { confirm_password, status, ...rest } = data;
    let res = '';
    if (isPublicRegistration) {
      res = await publicApi.post(`/users`, rest);
    } else {
      res = await api.post(`/users`, rest);
    }
    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateBlogData = async (data) => {
  try {
    const payload = {
      role: data.role,
      is_deleted: data.is_deleted,
      status: data.status,
      contact_number: data.contact_number,
    };
    const res = await api.patch(`/users/${data.id}`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteBlogAsync = async (ids, password) => {
  try {
    const res = await api.delete(`/users/bulk`, {
      data: { IDs: ids },
      headers: {
        password: password,
      },
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
